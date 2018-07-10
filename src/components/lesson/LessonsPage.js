import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from "react-router-dom";
import * as lessonActions from '../../actions/lessonActions';
import LessonList from './LessonList';
import {Labels} from '../../constants';

class LessonsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddLessonPage = this.redirectToAddLessonPage.bind(this);
  }

  lessonRow(lesson, index) {
    return <div key={index}>{lesson.title}</div>;
  }

  redirectToAddLessonPage() {
    this.props.history.push('/lesson');
  }

  render() {
    const {lessons, loginStatus} = this.props;

    return (
      <div>
        <h1>{Labels.shared.lessons_page.title}</h1>
        <LessonList lessons={lessons} loginStatus={loginStatus} />
      </div>
    );
  }
}

LessonsPage.propTypes = {
  lessons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loginStatus: PropTypes.string.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
    lessons: state.lessons,
    loginStatus: state.loginStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonsPage));
