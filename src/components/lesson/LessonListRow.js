import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const LessonListRow = ({lesson}) => {
  return (
    <tr>
      <td><a href={lesson.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/lesson/' + lesson.id}>{lesson.title}</Link></td>
      <td>{lesson.authorId}</td>
      <td>{lesson.category}</td>
      <td>{lesson.length}</td>
    </tr>
  );
};

LessonListRow.propTypes = {
  lesson: PropTypes.object.isRequired
};

export default LessonListRow;
