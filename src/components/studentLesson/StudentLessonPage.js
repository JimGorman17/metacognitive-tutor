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
import ImportantDetailsToReviewWizardStep from './ImportantDetailsToReviewWizardStep';
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
    const {lessons, actions, loggedInUser} = this.props;
    if (!lessons.length) {
      actions.loadLessons(loggedInUser);
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
      if (questionType != QuestionTypeEnum.story_question) {
        throw `Not Implemented questionType: ${questionType}`;
      }

      const {lesson, loggedInUser} = this.props;
      const question = lesson.storyQuestions[questionId - 1];

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

    let requests = studentLessonAnswersToSave.map(sla => new Promise((resolve) => this.props.actions.saveStudentLessonAction(sla, resolve))); // https://stackoverflow.com/a/18983245/109941, 07/21/2018
    Promise.all(requests)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success(Labels.student.lesson_page.answers_saved_success_message);
    this.props.history.push('/lessons');
  }

  render() {
    const {lesson} = this.props;
    const {studentLessonAnswers} = this.state;

    const steps =
      [
        {name: Labels.student.wizard_steps.welcome.title, component: <WelcomeWizardStep bookTitle={lesson.bookTitle} bookAmazonUrl={lesson.bookAmazonUrl} />},
        {name: Labels.student.wizard_steps.the_hook.title, component: <YouTubeVideoWizardStep youTubeVideo={lesson.theHookYouTubeVideo} />},
        {name: Labels.student.wizard_steps.two_vocabulary_words.title, component: <YouTubeVideoWizardStep youTubeVideo={lesson.theTwoVocabularyWordsYouTubeVideo} />},
        {name: Labels.student.wizard_steps.please_read_the_book.title, component: <PleaseReadTheBookWizardStep bookTitle={lesson.bookTitle} bookAmazonUrl={lesson.bookAmazonUrl} />},
        {name: Labels.student.wizard_steps.important_details_to_review.title, component: <ImportantDetailsToReviewWizardStep mainIdea={lesson.mainIdea} supportingIdea={lesson.supportingIdea} storyDetails={lesson.storyDetails} />},
        {name: Labels.student.wizard_steps.story_questions.title, component: <StoryQuestionsWizardStep questions={lesson.storyQuestions} answers={studentLessonAnswers.filter(sla => sla.questionType === QuestionTypeEnum.story_question)} onChange={this.updateStudentLessonAnswers} />},
        {name: Labels.student.wizard_steps.congratulations.title, component: <CongratulationsWizardStep bookTitle={lesson.bookTitle} lessonAuthor={lesson.lessonAuthor} />}
      ];

    return (
      <div>
        <h1>{Labels.student.lesson_page.title}</h1>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            nextTextOnFinalActionStep="Save"
            onStepChange={(step) => {if (step === steps.length - 1) {this.saveStudentLessonAnswers();}}}
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
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
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
    loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentLessonPage));