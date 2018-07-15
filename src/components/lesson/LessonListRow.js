import React from 'react';
import PropTypes from 'prop-types';
import LessonModel from '../../models/Lesson';
import {Labels, LoginTypeEnum} from '../../constants';
import {ButtonToolbar, Button} from 'react-bootstrap/lib';
import { NavLink } from 'react-router-dom';

const LessonListRow = ({lesson, loginStatus}) => {
  return (
    <tr className="d-flex">
      <td className="col-2">
        <div className="container">
          <div className="row" key={lesson.id}>
            <img src={lesson.lessonAuthor.providerPic} className="img-thumbnail" alt="{lesson.lessonAuthor.name}" />
          </div>
          <div className="row">
            {lesson.lessonAuthor.name}
          </div>
        </div>
      </td>
      <td className="col-4"><a href={lesson.bookAmazonUrl} target="_blank">{lesson.bookTitle}</a></td>
      <td className="col-4">
        <ButtonToolbar>
          <Button><i className="fa fa-eye fa-fw" aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.preview}</Button>
          {loginStatus == LoginTypeEnum.student &&
          <Button><i className={`fa fa-graduation-cap fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.complete_lesson}</Button>
          }
          {loginStatus == LoginTypeEnum.teacher &&
          <span>
          <NavLink to={'/lesson/' + lesson.id}><Button><i className={`fa fa-edit fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.edit}</Button></NavLink>
          <Button><i className={`fa fa-trash fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.remove}</Button>
          </span>
          }
        </ButtonToolbar>
      </td>
    </tr>
  );
};

LessonListRow.propTypes = {
  lesson: PropTypes.instanceOf(LessonModel).isRequired,
  loginStatus: PropTypes.string.isRequired
};

export default LessonListRow;
