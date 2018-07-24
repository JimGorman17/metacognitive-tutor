import React from 'react';
import PropTypes from 'prop-types';
import LessonListRow from './LessonListRow';
import LessonModel from '../../models/Lesson';
import LoginModel from '../../models/Login';
import {Labels} from '../../constants';

const LessonList = ({lessons, loginStatus, onDeleted, loggedInUser}) => {
  return (
    <table className="table">
      <thead>
        <tr className="d-flex">
          <th className="col-2">{Labels.teacher.lesson_form.manage_lesson.lesson_author}</th>
          <th className="col-4">{Labels.teacher.lesson_form.manage_lesson.book_title}</th>
          <th className="col-4">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {lessons.slice().sort((a, b) => a.id - b.id).map(lesson =>
          <LessonListRow key={lesson.id} lesson={lesson} loginStatus={loginStatus} onDeleted={onDeleted} loggedInUser={loggedInUser} />
        )}
      </tbody>
    </table>
  );
};

LessonList.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  loginStatus: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default LessonList;
