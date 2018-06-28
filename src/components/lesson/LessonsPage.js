import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import LessonList from './LessonList';
import {browserHistory} from 'react-router';
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
    browserHistory.push('/lesson');
  }

  render() {
    const {lessons} = this.props;

    return (
      <div>
        <h1>{Labels.shared.lessons_page.title}</h1>
        <input type="submit"
               value={Labels.teacher.create_lesson_page.title}
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <LessonList lessons={lessons}/>
      </div>
    );
  }
}

LessonsPage.propTypes = {
  lessons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
    lessons: state.lessons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsPage);
