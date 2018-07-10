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
            <img src={lesson.LessonAuthor.ProviderPic} className="img-thumbnail" alt="{lesson.LessonAuthor.Name}" />
          </div>
          <div className="row">
            {lesson.LessonAuthor.Name}
          </div>
        </div>
      </td>
      <td className="col-4"><a href={lesson.BookAmazonUrl} target="_blank">{lesson.BookTitle}</a></td>
      <td className="col-4">
        <ButtonToolbar>
          <Button><i className="fa fa-eye fa-fw" aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.preview}</Button>
          {loginStatus == LoginTypeEnum.student &&
          <Button><i className={`fa fa-graduation-cap fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.complete_lesson}</Button>
          }
          {loginStatus == LoginTypeEnum.teacher &&
          <NavLink to={'/lesson/' + lesson.id}><Button><i className={`fa fa-edit fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.edit}</Button></NavLink>
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
