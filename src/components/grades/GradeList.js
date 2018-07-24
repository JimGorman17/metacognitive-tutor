import React from 'react';
import PropTypes from 'prop-types';
import GradeListRow from './GradeListRow';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import LoginModel from '../../models/Login';
import {Labels} from '../../constants';

const GradeList = ({onSaveGrade, onRemoveGrade, groupedStudentLessonAnswers, loggedInUser}) => {
  return (
    <table className="table">
      <thead>
        <tr className="d-flex">
          <th className="col-1">&nbsp;</th>
          <th className="col-2">{Labels.teacher.grades_page.column_headers.student}</th>
          <th className="col-7">&nbsp;</th>
          <th className="col-2">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {groupedStudentLessonAnswers.map((gsla, index) =>
          <GradeListRow onSaveGrade={onSaveGrade} onRemoveGrade={onRemoveGrade} key={`${gsla.lessonId}-${gsla.provider}-${gsla.providerId}`} index={index+1} groupedStudentLessonAnswer={gsla} loggedInUser={loggedInUser} />
        )}
      </tbody>
    </table>
  );
};

GradeList.propTypes = {
  groupedStudentLessonAnswers: PropTypes.arrayOf(PropTypes.instanceOf(GroupedStudentLessonAnswerModel)).isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired,
  onSaveGrade: PropTypes.func.isRequired,
  onRemoveGrade: PropTypes.func.isRequired
};

export default GradeList;
