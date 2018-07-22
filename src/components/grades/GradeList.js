import React from 'react';
import PropTypes from 'prop-types';
import GradeListRow from './GradeListRow';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import LoginModel from '../../models/Login';
import {Labels} from '../../constants';

const GradeList = ({groupedStudentLessonAnswers, loggedInUser}) => {
  return (
    <table className="table">
      <thead>
        <tr className="d-flex">
          <th className="col-2">{Labels.teacher.grades_page.column_headers.student}</th>
          <th className="col-4">{Labels.teacher.grades_page.column_headers.answers}</th>
          <th className="col-4">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {groupedStudentLessonAnswers.map(gsla =>
          <GradeListRow key={`${gsla.lessonId}-${gsla.provider}-${gsla.providerId}`} groupedStudentLessonAnswer={gsla} loggedInUser={loggedInUser} />
        )}
      </tbody>
    </table>
  );
};

GradeList.propTypes = {
  groupedStudentLessonAnswers: PropTypes.arrayOf(PropTypes.instanceOf(GroupedStudentLessonAnswerModel)).isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default GradeList;
