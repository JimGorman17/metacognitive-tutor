import React from 'react';
import PropTypes from 'prop-types';
import LessonModel from '../../models/Lesson';
import LoginModel from '../../models/Login';
import {Labels, LoginTypeEnum} from '../../constants';
import {Modal, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap/lib';
import FieldGroup from '../common/FieldGroup';
import { NavLink } from 'react-router-dom';
import fillTemplate from 'es6-dynamic-template'; // https://stackoverflow.com/a/51079254/109941, 07/22/2018

class LessonListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
    const {lesson, loginStatus, onDeleted, loggedInUser} = this.props;

    return (
      <tr className="d-flex">
        <td className="col-2">
          <div className="container">
            <div className="row" key={1}>
              <img src={lesson.lessonAuthor.providerPic} className="img-thumbnail" alt={lesson.lessonAuthor.name} />
            </div>
            <div className="row" key={2}>
              {lesson.lessonAuthor.name}
            </div>
          </div>
        </td>
        <td className="col-4"><a href={lesson.bookAmazonUrl} target="_blank">{lesson.bookTitle}</a></td>
        <td className="col-4">
          <ButtonToolbar>
            <NavLink to={`/student_lesson/${lesson.id}/${true}`}><Button><i className="fa fa-eye fa-fw" aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.preview}</Button></NavLink>
            {loginStatus === LoginTypeEnum.student &&
            <React.Fragment>
              {lesson.gradeResponse.isGraded
                ? <Button onClick={this.openModal}><i className={`fa fa-smile-o fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.see_your_grade}</Button>
                : <NavLink to={'/student_lesson/' + lesson.id}><Button><i className={`fa fa-graduation-cap fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.complete_lesson}</Button></NavLink>
              }
              <Modal show={this.state.showModal} animation={false} onHide={this.handleClose} dialogClassName="modal-lg">
                <Modal.Header>
                  <Modal.Title>{fillTemplate(Labels.teacher.grades_page.grade_for, {studentName: loggedInUser.name})}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FieldGroup
                    id="grade"
                    type="text"
                    label={Labels.teacher.grades_page.grade_label_text}
                    maxLength={10}
                    defaultValue={lesson.gradeResponse.grade}
                    style={{width: "10em"}}
                    disabled
                  />
                  <FormGroup controlId="comments">
                    <ControlLabel>{Labels.teacher.grades_page.comments_label_text}</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows={8}
                      defaultValue={lesson.gradeResponse.comments}
                      disabled
                    />
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.handleClose}><i className={`fa fa-close fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.close_model_label}</Button>
                  </ButtonToolbar>
                </Modal.Footer>
              </Modal>
            </React.Fragment>
            }
            {loginStatus === LoginTypeEnum.teacher && lesson.provider === loggedInUser.provider && lesson.providerId === loggedInUser.providerId &&
            <React.Fragment>
              {!!lesson.numberOfEnrolledStudents && // https://medium.freecodecamp.org/conditional-rendering-in-react-using-ternaries-and-logical-and-7807f53b6935, 07/22/2018
              <NavLink to={'/grades/' + lesson.id}><Button><i className={`fa fa-graduation-cap fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.button_title}</Button></NavLink>
              }
              {!lesson.numberOfEnrolledStudents &&
              <React.Fragment>
              <NavLink to={'/lesson/' + lesson.id}><Button><i className={`fa fa-edit fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.edit}</Button></NavLink>
              <Button onClick={() => onDeleted(lesson.id)}><i className={`fa fa-trash fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.remove}</Button>
              </React.Fragment>
              }
            </React.Fragment>
            }
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
}

LessonListRow.propTypes = {
  lesson: PropTypes.instanceOf(LessonModel).isRequired,
  loginStatus: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default LessonListRow;
