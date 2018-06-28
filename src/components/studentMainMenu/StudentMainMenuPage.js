import React from 'react';
import {Labels} from '../../constants';

class StudentMainMenuPage extends React.Component {
  render() {
    return (
      <div>
        <h1>{Labels.student.main_menu.title}</h1>
        <p>{Labels.student.main_menu.description}</p>
      </div>
    );
  }
}

export default StudentMainMenuPage;
