import React from 'react';
import PropTypes from 'prop-types';
import LessonModel from '../../models/Lesson';
import {Labels, LoginTypeEnum} from '../../constants';  // eslint-disable-line

const LessonListRow = ({lesson}) => {
  return (
    <tr className="d-flex">
      <td className="col-2">
        <div className="container">
          <div className="row">
            <img src={lesson.LessonAuthor.ProviderPic} className="img-thumbnail" alt="{lesson.LessonAuthor.Name}" />
          </div>
          <div className="row">
            {lesson.LessonAuthor.Name}
          </div>
        </div>
      </td>
      <td className="col-4"><a href={lesson.BookAmazonUrl} target="_blank">{lesson.BookTitle}</a></td>
      <td className="col-4">
        <div className="container">
          <div className="row">
            <div className="col-md-5">{Labels.teacher.lesson_form.manage_lesson.preview}</div><div className="col-md-1">&nbsp;</div><div className="col-md-5">{Labels.teacher.lesson_form.manage_lesson.edit}</div>
          </div>
        </div>
      </td>
    </tr>
  );
};

LessonListRow.propTypes = {
  lesson: PropTypes.instanceOf(LessonModel).isRequired
};

export default LessonListRow;
