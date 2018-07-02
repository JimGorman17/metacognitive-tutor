import React from 'react';
import {Labels} from '../../constants';

class StudentLessonPage extends React.Component {
  render() {
    return (
      <div>
        <h1>{Labels.student.lesson_page.title}</h1>
        <p>{Labels.student.lesson_page.description}</p>
      </div>
    );
  }
}

export default StudentLessonPage;
