import React from 'react';
import {Labels} from '../../constants';

class TeacherAdminPage extends React.Component {
  render() {
    return (
      <div>
        <h1>{Labels.teacher.admin_page.title}</h1>
        <p>{Labels.teacher.admin_page.description}</p>
      </div>
    );
  }
}

export default TeacherAdminPage;
