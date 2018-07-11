import React from 'react';
import PropTypes from 'prop-types';
import LessonListRow from './LessonListRow';
import LessonModel from '../../models/Lesson';
import {Labels} from '../../constants';

const LessonList = ({lessons, loginStatus}) => {
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
        {lessons.map(lesson =>
          <LessonListRow key={lesson.id} lesson={lesson} loginStatus={loginStatus} />
        )}
      </tbody>
    </table>
  );
};

LessonList.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  loginStatus: PropTypes.string.isRequired
};

export default LessonList;
