import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from "react-router-dom";
import * as lessonActions from '../../actions/lessonActions';
import LessonList from './LessonList';
import {Labels} from '../../constants';
import LoginModel from '../../models/Login';
import LessonModel from '../../models/Lesson';
import DeleteLessonModel from '../../models/DeleteLesson';

class LessonsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddLessonPage = this.redirectToAddLessonPage.bind(this);
    this.onDeleted = this.onDeleted.bind(this);
  }

  onDeleted(lessonId) {
    const {actions, loggedInUser} = this.props;
    actions.deleteLesson(new DeleteLessonModel({
      id: lessonId,
      lessonAuthor: loggedInUser
    }));
  }

  lessonRow(lesson, index) {
    return <div key={index}>{lesson.title}</div>;
  }

  redirectToAddLessonPage() {
    this.props.history.push('/lesson');
  }

  componentDidMount(){
    const {lessons, actions, loggedInUser} = this.props;
    if (!lessons.length) {
      actions.loadLessons(loggedInUser);
    }
  }

  render() {
    const {lessons, loginStatus, loggedInUser} = this.props;

    return (
      <div>
        <h1>{Labels.shared.lessons_page.title}</h1>
        <LessonList lessons={lessons} loginStatus={loginStatus} onDeleted={this.onDeleted} loggedInUser={loggedInUser} />
      </div>
    );
  }
}

LessonsPage.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loginStatus: PropTypes.string.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
    lessons: state.lessons,
    loginStatus: state.loginStatus,
    loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonsPage));
