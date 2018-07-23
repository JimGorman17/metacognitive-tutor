import React from 'react';
import PropTypes from 'prop-types';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import FieldGroup from '../common/FieldGroup';
import LoginModel from '../../models/Login';
import {Modal, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap/lib';
import BootstrapTable from 'react-bootstrap-table-next';
import {Labels} from '../../constants';
import fillTemplate from 'es6-dynamic-template'; // https://stackoverflow.com/a/51079254/109941, 07/22/2018

class GradeListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleSave() {
    this.setState({ showModal: false });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
    const {index, groupedStudentLessonAnswer, loggedInUser} = this.props; // eslint-disable-line

    const columns = [
    {
      dataField: 'id',
      hidden: true
    },
    {
      dataField: 'question',
      text: Labels.teacher.grades_page.column_headers.question,
      headerStyle: { width: '10em' }
    },
    {
      dataField: 'answer',
      text: Labels.teacher.grades_page.column_headers.answer
    }];

    const data = groupedStudentLessonAnswer.studentLessonAnswers.slice().sort((a, b) => a.questionId - b.questionId).map((sla, index) => ({id: index, question: sla.question, answer: sla.answer}));

    return (
      <React.Fragment>
        <tr className="d-flex">
          <td className="col-1">{`${index}.`}</td>
          <td className="col-2">
            <div className="container">
              <div className="row" key={1}>
                <img src={groupedStudentLessonAnswer.providerPic} className="img-thumbnail" alt={groupedStudentLessonAnswer.name} />
              </div>
              <div className="row" key={2}>
                {groupedStudentLessonAnswer.name}
              </div>
            </div>
          </td>
          <td className="col-7">
            <BootstrapTable keyField='id' data={data} columns={columns} />
          </td>
          <td className="col-2">
            {groupedStudentLessonAnswer.gradeResponse.isGraded
              ? <ButtonToolbar>
                  <Button onClick={this.openModal} ><i className={`fa fa-edit fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.edit_button_text}</Button>
                  <Button><i className={`fa fa-trash-can fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.remove_button_text}</Button>
                </ButtonToolbar>
              : <Button onClick={this.openModal}><i className={`fa fa-graduation-cap fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.grade_button_text}</Button>
            }
          </td>
        </tr>
        <Modal show={this.state.showModal} animation={false} onHide={this.handleClose} dialogClassName="modal-lg">
          <Modal.Header>
            <Modal.Title>{fillTemplate(Labels.teacher.grades_page.grade_for, {studentName: groupedStudentLessonAnswer.name})}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <FieldGroup
              id="formControlsText"
              type="text"
              label={Labels.teacher.grades_page.grade_label_text}
              maxLength={10}
              style={{width: "10em"}}
            />
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>{Labels.teacher.grades_page.comment_label_text}</ControlLabel>
              <FormControl componentClass="textarea" rows={8}/>
            </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button bsStyle="primary"><i className={`fa fa-save fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.save_button_text}</Button>
              <Button><i className={`fa fa-close fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.cancel_button_text}</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

GradeListRow.propTypes = {
  index: PropTypes.number.isRequired,
  groupedStudentLessonAnswer: PropTypes.instanceOf(GroupedStudentLessonAnswerModel).isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default GradeListRow;
