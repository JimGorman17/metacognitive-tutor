import React from 'react';
import PropTypes from 'prop-types';
import {Labels, QuestionTypeEnum} from '../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from "react-router-dom";
import * as lessonActions from '../../actions/lessonActions';
import StepZilla from 'react-stepzilla';
import YouTubeVideoWizardStep from './YouTubeVideoWizardStep';
import StoryQuestionsWizardStep from './StoryQuestionsWizardStep';
import LessonModel from '../../models/Lesson';
import LoginModel from '../../models/Login';
import StudentLessonAnswerModel from '../../models/StudentLessonAnswer';
import WelcomeWizardStep from './WelcomeWizardStep';
import PleaseReadTheBookWizardStep from './PleaseReadTheBookWizardStep';
import CardPyramidWizardStep from './CardPyramidWizardStep';
import WordScrambleWizardStep from './WordScrambleWizardStep';
import CongratulationsWizardStep from './CongratulationsWizardStep';
import toastr from 'toastr';

class StudentLessonPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      studentLessonAnswers: props.studentLessonAnswers.slice(),
      saving: false
      // errors: {} // TODO: Validate student responses.
    };

    this.updateStudentLessonAnswers = this.updateStudentLessonAnswers.bind(this);
    this.saveStudentLessonAnswers = this.saveStudentLessonAnswers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.studentLessonAnswers) !== JSON.stringify(nextProps.studentLessonAnswers)) { // https://stackoverflow.com/a/23555773/109941, 07/21/2018
      this.setState({studentLessonAnswers: nextProps.studentLessonAnswers.slice()});
    }
  }

  componentDidMount(){
    const {lessons, studentLessonAnswers, actions, loggedInUser} = this.props;
    if (!lessons.length) {
      actions.loadLessons(loggedInUser);
    }
    if (!studentLessonAnswers.length) {
      actions.loadStudentLessonAnswers(loggedInUser);
    }
  }

  updateStudentLessonAnswers(questionType, questionId, answer) {
    const {studentLessonAnswers} = this.state;

    let newStudentLessonAnswers = null;
    if (studentLessonAnswers.some(sla => sla.questionType === questionType && sla.questionId === questionId)) {
      newStudentLessonAnswers = studentLessonAnswers.map(sla => {
        if (sla.questionType === questionType && sla.questionId === questionId) {
          return new StudentLessonAnswerModel(Object.assign({}, sla, {answer:answer}));
        }
        return sla;
      });
    } else {
      const {lesson, loggedInUser} = this.props;
      let question = "";
      switch(questionType) {
        case QuestionTypeEnum.story_question:
          question = lesson.storyQuestions[questionId - 1];
          break;
        case QuestionTypeEnum.card_pyramid:
          question = Labels.student.wizard_steps.card_pyramid.title;
          break;
        case QuestionTypeEnum.word_scramble:
          question = Labels.student.wizard_steps.word_scramble.title;
          break;
        default:
          throw `Not Implemented questionType: ${questionType}`;
      }

      newStudentLessonAnswers = [
        ...studentLessonAnswers.filter(sla => sla.questionId !== questionId),
        new StudentLessonAnswerModel({lessonId: lesson.id, questionType: questionType, questionId: questionId, question: question, answer: answer, student: loggedInUser})
      ];
    }

    return this.setState({studentLessonAnswers: newStudentLessonAnswers});
  }

  saveStudentLessonAnswers() {
    this.setState({saving: true});

    const {studentLessonAnswers} = this.state;
    const studentLessonAnswersToSave = studentLessonAnswers.map(sla => new StudentLessonAnswerModel(Object.assign({}, sla, {student: this.props.loggedInUser})));

    let requests = studentLessonAnswersToSave.map(sla => new Promise((resolve, reject) => this.props.actions.saveStudentLessonAnswer(sla).then(() => resolve()).catch((error) => reject(error)))); // https://stackoverflow.com/a/18983245/109941, 07/21/2018
    Promise.all(requests)
      .then(() => {
        toastr.success(Labels.student.lesson_page.answers_saved_success_message)
      })
      .catch(error => {
        toastr.error(error);
      });

    this.setState({saving: false});
  }

  render() {
    const {lesson, isPreviewMode} = this.props;
    const {studentLessonAnswers} = this.state;

    const steps =
      [
        {name: Labels.student.wizard_steps.welcome.title, component: <WelcomeWizardStep bookTitle={lesson.bookTitle} bookAmazonUrl={lesson.bookAmazonUrl} />},
        {name: Labels.student.wizard_steps.the_hook.title, component: <YouTubeVideoWizardStep youTubeVideo={lesson.theHookYouTubeVideo} />},
        {name: Labels.student.wizard_steps.two_vocabulary_words.title, component: <YouTubeVideoWizardStep youTubeVideo={lesson.theTwoVocabularyWordsYouTubeVideo} />},
        {name: Labels.student.wizard_steps.please_read_the_book.title, component: <PleaseReadTheBookWizardStep bookTitle={lesson.bookTitle} bookAmazonUrl={lesson.bookAmazonUrl} />},
        {name: Labels.student.wizard_steps.card_pyramid.title, component: <CardPyramidWizardStep mainIdea={lesson.mainIdea} supportingIdea={lesson.supportingIdea} storyDetails={lesson.storyDetails} onChange={this.updateStudentLessonAnswers} answer={studentLessonAnswers.find(sla => sla.questionType === QuestionTypeEnum.card_pyramid)} />},
        {name: Labels.student.wizard_steps.word_scramble.title, component: <WordScrambleWizardStep onChange={this.updateStudentLessonAnswers} sentences={lesson.importantSentencesForWordScramble} answer={studentLessonAnswers.find(sla => sla.questionType === QuestionTypeEnum.word_scramble)} />},
        {name: Labels.student.wizard_steps.story_questions.title, component: <StoryQuestionsWizardStep questions={lesson.storyQuestions} answers={studentLessonAnswers.slice().filter(sla => sla.questionType === QuestionTypeEnum.story_question).sort((a, b) => { return a.questionId - b.questionId})} onChange={this.updateStudentLessonAnswers} />},
        {name: Labels.student.wizard_steps.congratulations.title, component: <CongratulationsWizardStep bookTitle={lesson.bookTitle} lessonAuthor={lesson.lessonAuthor} />}
      ];

    return (
      <div>
        <h1>{Labels.student.lesson_page.title}</h1>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            nextTextOnFinalActionStep={!isPreviewMode ? "Save" : ""}
            onStepChange={(step) => {if (!isPreviewMode && step === steps.length - 1) {this.saveStudentLessonAnswers();}}}
            />
        </div>
      </div>
    );
  }
}

StudentLessonPage.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  lesson: PropTypes.object.isRequired,
  studentLessonAnswers: PropTypes.arrayOf(PropTypes.instanceOf(StudentLessonAnswerModel)).isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired,
  isPreviewMode: PropTypes.bool
};

function getLessonById(lessons, id) {
  const lesson = lessons.filter(lesson => lesson.id == id);
  if (lesson) return lesson[0]; //since filter returns an array, have to grab the first.
  return null;
}

function getStudentLessonAnswersByLessonId(studentLessonAnswers, id) {
  return studentLessonAnswers.filter(sla => sla.lessonId == id);
}

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.match.params.id; // from the path `/lesson/:id`
  const isPreviewMode = ownProps.match.params.is_preview_mode;

  let lesson = new LessonModel();
  let studentLessonAnswers = [];

  if (lessonId && 0 < state.lessons.length) {
    lesson = getLessonById(state.lessons, lessonId);
    studentLessonAnswers = getStudentLessonAnswersByLessonId(state.studentLessonAnswers, lessonId);
  }

  return {
    lessons: state.lessons,
    studentLessonAnswers: studentLessonAnswers,
    lesson: lesson,
    loggedInUser: state.loggedInUser,
    isPreviewMode: isPreviewMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentLessonPage));