import React from 'react';
import PropTypes from 'prop-types';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import LoginModel from '../../models/Login';
import {ButtonToolbar, Button} from 'react-bootstrap/lib'; // eslint-disable-line

const GradeListRow = ({groupedStudentLessonAnswer, loggedInUser}) => { // eslint-disable-line
  return (
    <tr className="d-flex">
      <td className="col-2">
        <div className="container">
          <div className="row" key={1}>
            <img src={groupedStudentLessonAnswer.providerPic} className="img-thumbnail" alt={groupedStudentLessonAnswer.name} />
          </div>
          <div className="row" key={2}>
            {groupedStudentLessonAnswer.name}
          </div>
        </div>
      </td>
      <td className="col-4">Q+A</td>
      <td className="col-4">
        Buttons
      </td>
    </tr>
  );
};

GradeListRow.propTypes = {
  groupedStudentLessonAnswer: PropTypes.instanceOf(GroupedStudentLessonAnswerModel).isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default GradeListRow;
