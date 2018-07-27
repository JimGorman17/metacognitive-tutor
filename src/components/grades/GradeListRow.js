import React from 'react';
import PropTypes from 'prop-types';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import FieldGroup from '../common/FieldGroup';
import {Modal, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap/lib';
import BootstrapTable from 'react-bootstrap-table-next';
import {Labels, QuestionTypeEnum} from '../../constants';
import fillTemplate from 'es6-dynamic-template'; // https://stackoverflow.com/a/51079254/109941, 07/22/2018

class GradeListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleSave() {
    const {onSaveGrade, groupedStudentLessonAnswer} = this.props;
    const grade = this.grade.value;
    const comments = this.comments.value;
    if(typeof grade === "string" && grade.trim().length) {
      onSaveGrade(groupedStudentLessonAnswer.provider, groupedStudentLessonAnswer.providerId, grade, comments);
      this.setState({ showModal: false });
    }
  }

  handleRemove() {
    const {onRemoveGrade, groupedStudentLessonAnswer} = this.props;
    onRemoveGrade(groupedStudentLessonAnswer.provider, groupedStudentLessonAnswer.providerId);
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  renderAnswer = (cell, row/*, rowIndex*/) => {
    if (row.questionType === QuestionTypeEnum.card_pyramid) {
      return (
        <React.Fragment>
          {Labels.teacher.grades_page.card_pyramid.main_ideas}:<br />
          <ul>
            {row.answer.mainIdeas.map(mi => <li key={mi.id}><span className={`badge badge-${mi.id === Labels.teacher.grades_page.card_pyramid.keys.main_idea ? "success" : "danger"}`}>{mi.id}</span>: {mi.data}</li>)}
          </ul>
          {Labels.teacher.grades_page.card_pyramid.supporting_ideas}:<br />
          <ul>
            {row.answer.supportingIdeas.map(si => <li key={si.id}><span className={`badge badge-${si.id === Labels.teacher.grades_page.card_pyramid.keys.supporting_idea ? "success" : "danger"}`}>{si.id}</span>: {si.data}</li>)}
          </ul>
          {Labels.teacher.grades_page.card_pyramid.story_details}:<br />
          <ul>
            {row.answer.storyDetails.map(sd => <li key={sd.id}><span className={`badge badge-${sd.id.startsWith(Labels.teacher.grades_page.card_pyramid.keys.story_detail) ? "success" : "danger"}`}>{sd.id}</span>: {sd.data}</li>)}
          </ul>
          {Labels.teacher.grades_page.card_pyramid.unused_items}:<br />
          <ul>
            {row.answer.shuffledItems.map(si => <li key={si.id}><span className={`badge badge-danger`}>{si.id}</span>: {si.data}</li>)}
          </ul>
        </React.Fragment>);
    }
    else {
      return row.answer;
    }
  }

  columns = [
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
      dataField: 'questionType',
      hidden: true
    },
    {
      dataField: 'answer',
      text: Labels.teacher.grades_page.column_headers.answer,
      formatter: this.renderAnswer.bind(this)
    }];

  render() {
    const {index, groupedStudentLessonAnswer} = this.props;

    const data = groupedStudentLessonAnswer.studentLessonAnswers.slice().sort((a, b) => a.questionId - b.questionId).map((sla, index) => ({
      id: index,
      question: sla.question,
      questionType: sla.questionType,
      answer: sla.answer
    }));

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
            <BootstrapTable keyField='id' data={data} columns={this.columns} />
          </td>
          <td className="col-2">
            {groupedStudentLessonAnswer.gradeResponse.isGraded
              ? <React.Fragment>
                  <FieldGroup
                    id="readOnlyGrade"
                    type="text"
                    label={Labels.teacher.grades_page.grade_label_text}
                    value={groupedStudentLessonAnswer.gradeResponse.grade}
                    disabled
                  />
                  <ButtonToolbar>
                    <Button onClick={this.openModal}><i className={`fa fa-edit fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.edit_button_text}</Button>
                    <Button onClick={this.handleRemove}><i className={`fa fa-trash fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.remove_button_text}</Button>
                  </ButtonToolbar>
                </React.Fragment>
              : <Button onClick={this.openModal}><i className={`fa fa-graduation-cap fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.grade_button_text}</Button>
            }
          </td>
        </tr>
        <Modal show={this.state.showModal} animation={false} onHide={this.handleClose} dialogClassName="modal-lg">
          <Modal.Header>
            <Modal.Title>{fillTemplate(Labels.teacher.grades_page.grade_for, {studentName: groupedStudentLessonAnswer.name})}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FieldGroup
              id="grade"
              type="text"
              label={Labels.teacher.grades_page.grade_label_text}
              maxLength={10}
              defaultValue={groupedStudentLessonAnswer.gradeResponse.grade}
              style={{width: "10em"}}
              inputRef={ref => { this.grade = ref; }}
            />
            <FormGroup controlId="comments">
              <ControlLabel>{Labels.teacher.grades_page.comments_label_text}</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={8}
                inputRef={ref => { this.comments = ref; }}
                defaultValue={groupedStudentLessonAnswer.gradeResponse.comments}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={this.handleSave} bsStyle="primary"><i className={`fa fa-save fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.save_button_text}</Button>
              <Button onClick={this.handleClose}><i className={`fa fa-close fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.grades_page.cancel_button_text}</Button>
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
  onSaveGrade: PropTypes.func.isRequired,
  onRemoveGrade: PropTypes.func.isRequired
};

export default GradeListRow;
