import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import LoginModel from '../../models/Login';
import GroupedStudentLessonAnswerModel from '../../models/GroupedStudentLessonAnswer';
import {Labels} from '../../constants';
import lessonApi from '../../api/lessonApi';
import toastr from 'toastr';

class GradesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      groupedStudentLessonAnswers: [],
    };
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

    return (
      <div>
        <h1>{Labels.teacher.grades_page.title}</h1>
        <ul>
          {groupedStudentLessonAnswers.map(gsla => <li key={`${gsla.lessonId}-${gsla.provider}-${gsla.providerId}`}>{gsla.name}</li>)}
        </ul>
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
