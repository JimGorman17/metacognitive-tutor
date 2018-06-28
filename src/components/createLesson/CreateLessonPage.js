import React from 'react';
import {Labels} from '../../constants';

class CreateLessonPage extends React.Component {
  render() {
    return (
      <div>
        <h1>{Labels.teacher.create_lesson_page.title}</h1>
        <p>{Labels.teacher.create_lesson_page.description}</p>
      </div>
    );
  }
}

export default CreateLessonPage;
