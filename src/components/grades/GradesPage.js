import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import LoginModel from '../../models/Login';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import {Labels} from '../../constants';
import lessonApi from '../../api/lessonApi';
import toastr from 'toastr';
import GradeList from './GradeList';
import fillTemplate from 'es6-dynamic-template'; // https://stackoverflow.com/a/51079254/109941, 07/22/2018

class GradesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      groupedStudentLessonAnswers: [],
    };

    this.saveGrade = this.saveGrade.bind(this);
  }

  saveGrade(provider, providerId, grade, comments) {
    console.log(provider, providerId, grade, comments); // eslint-disable-line
  }

  componentDidMount() {
    const {loggedInUser, lessonId} = this.props;

    return lessonApi.getAllStudentLessonAnswersForATeacher(loggedInUser, lessonId)
      .then((response) => this.setState({groupedStudentLessonAnswers: response.data.map(d => new GroupedStudentLessonAnswerModel(d))}))
      .catch(error => {
        toastr.error(error);
      });
  }

  render() {
    const {groupedStudentLessonAnswers} = this.state;
    const {loggedInUser} = this.props;

    return (
      <div>
        <h1>{fillTemplate(Labels.teacher.grades_page.title, {lessonName: groupedStudentLessonAnswers.length && groupedStudentLessonAnswers.length ? groupedStudentLessonAnswers[0].bookTitle : ""})}</h1>
        <GradeList onSaveGrade={this.saveGrade} groupedStudentLessonAnswers={groupedStudentLessonAnswers} loggedInUser={loggedInUser} />
      </div>
    );
  }
}

GradesPage.propTypes = {
  lessonId: PropTypes.number.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired,
};

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.match.params.id; // from the path `/lesson/:id`

  return {
    lessonId: parseInt(lessonId),
    loggedInUser: state.loggedInUser,
  };
}

export default withRouter(connect(mapStateToProps)(GradesPage));
