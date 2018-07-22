import React from 'react';
import {Labels} from '../../constants';

class GradesPage extends React.Component {
  componentDidMount(){
    const {lessons, actions, loggedInUser} = this.props;
    if (!lessons.length) {
      actions.loadLessons(loggedInUser);
      actions.loadStudentLessonAnswers(loggedInUser);
    }
  }

  render() {
    return (
      <div>
        <h1>{Labels.teacher.admin_page.title}</h1>
        <p>{Labels.teacher.admin_page.description}</p>
      </div>
    );
  }
}

GradesPage.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  studentLessonAnswers: PropTypes.arrayOf(PropTypes.instanceOf(StudentLessonAnswerModel)).isRequired,
  actions: PropTypes.object.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default GradesPage;
