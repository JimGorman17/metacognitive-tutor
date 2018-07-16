import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';
import {connect} from 'react-redux';
import * as lessonActions from '../../actions/lessonActions';
import {bindActionCreators} from 'redux';
import StepZilla from 'react-stepzilla';
import YouTubeVideoWizardStep from './YouTubeVideoWizardStep';
import ListWizardStep from './ListWizardStep';
import LessonModel from '../../models/Lesson';
import LoginModel from '../../models/Login';

import WelcomeWizardStep from './WelcomeWizardStep';
import PleaseReadTheBookWizardStep from './PleaseReadTheBookWizardStep';
import ImportantDetailsToReviewWizardStep from './ImportantDetailsToReviewWizardStep';

class StudentLessonPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {} // TODO: Validate student responses.
    };
  }

  componentDidMount(){
    const {lessons, actions, loggedInUser} = this.props;
    if (!lessons.length) {
      actions.loadLessons(loggedInUser);
    }
  }

  render() {
    const {lesson} = this.props;

    const steps =
      [
        {name: Labels.student.wizard_steps.welcome.title, component: <WelcomeWizardStep bookTitle={lesson.bookTitle} bookAmazonUrl={lesson.bookAmazonUrl} />},
        {name: Labels.student.wizard_steps.the_hook.title, component: <YouTubeVideoWizardStep youTubeVideo={lesson.theHookYouTubeVideo} />},
        {name: Labels.student.wizard_steps.two_vocabulary_words.title, component: <YouTubeVideoWizardStep youTubeVideo={lesson.theTwoVocabularyWordsYouTubeVideo} />},
        {name: Labels.student.wizard_steps.please_read_the_book.title, component: <PleaseReadTheBookWizardStep bookTitle={lesson.bookTitle} bookAmazonUrl={lesson.bookAmazonUrl} />},
        {name: Labels.student.wizard_steps.important_details_to_review.title, component: <ImportantDetailsToReviewWizardStep mainIdea={lesson.mainIdea} supportingIdea={lesson.supportingIdea} storyDetails={lesson.storyDetails} />},
        {name: Labels.student.wizard_steps.story_questions.title, component: <ListWizardStep />}//,
        //{name: Labels.student.wizard_steps.congratulations.title, component: <TextWizardStep />}
      ];

    return (
      <div>
        <h1>{Labels.student.lesson_page.title}</h1>
        <div className='step-progress'>
          <StepZilla steps={steps}/>
        </div>
      </div>
    );
  }
}

StudentLessonPage.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  lesson: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

function getLessonById(lessons, id) {
  const lesson = lessons.filter(lesson => lesson.id == id);
  if (lesson) return lesson[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.match.params.id; // from the path `/lesson/:id`

  let lesson = new LessonModel();

  if (lessonId && state.lessons.length > 0) {
    lesson = getLessonById(state.lessons, lessonId);
  }

  return {
    lessons: state.lessons,
    lesson: lesson,
    loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentLessonPage);