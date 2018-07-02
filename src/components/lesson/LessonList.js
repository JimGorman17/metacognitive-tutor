import React from 'react';
import PropTypes from 'prop-types';
import LessonListRow from './LessonListRow';

const LessonList = ({lessons}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {lessons.map(lesson =>
        <LessonListRow key={lesson.id} lesson={lesson}/>
      )}
      </tbody>
    </table>
  );
};

LessonList.propTypes = {
  lessons: PropTypes.array.isRequired
};

export default LessonList;
