import React from 'react';
import PropTypes from 'prop-types';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import LoginModel from '../../models/Login';
import {Modal, ButtonToolbar, Button} from 'react-bootstrap/lib';
import BootstrapTable from 'react-bootstrap-table-next';
import {Labels} from '../../constants';

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
      <div>
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
            My title
          </Modal.Header>
          <Modal.Body>
            My body
          </Modal.Body>
          <Modal.Footer>
            My footer
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

GradeListRow.propTypes = {
  index: PropTypes.number.isRequired,
  groupedStudentLessonAnswer: PropTypes.instanceOf(GroupedStudentLessonAnswerModel).isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

export default GradeListRow;
