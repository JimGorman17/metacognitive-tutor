import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from "react-router-dom";
import * as lessonActions from '../../actions/lessonActions';
import LessonForm from './LessonForm';
import {Labels} from '../../constants';
import toastr from 'toastr';
import LessonModel from '../../models/Lesson';
import LoginModel from '../../models/Login';

export class ManageLessonPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lesson: Object.assign({}, props.lesson),
      errors: {},
      saving: false
    };

    this.updateLessonState = this.updateLessonState.bind(this);
    this.saveLesson = this.saveLesson.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lesson.id != nextProps.lesson.id) {
      // Necessary to populate form when existing lesson is loaded directly.
      this.setState({lesson: Object.assign({}, nextProps.lesson)});
    }
  }

  componentDidMount(){
    const {lessons, actions, loggedInUser} = this.props;
    if (!lessons.length) {
      actions.loadLessons(loggedInUser);
    }
  }

  updateLessonState(event) {
    const field = event.target.name;
    let lesson = Object.assign({}, this.state.lesson);
    lesson[field] = event.target.value;
    return this.setState({lesson: lesson});
  }

  lessonFormIsValid() {
    let formIsValid = true;
    let errors = {};

    // TODO: Add some validation.
    // if (this.state.lesson.title.length < 5) {
    //   errors.title = 'Title must be at least 5 characters.';
    //   formIsValid = false;
    // }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveLesson(event) {
    event.preventDefault();

    if (!this.lessonFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    const lesson = new LessonModel(Object.assign({}, this.state.lesson, {lessonAuthor: this.props.loggedInUser})); // to avoid manipulating object passed in.

    this.props.actions.saveLesson(lesson)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success(Labels.teacher.create_lesson_page.lesson_saved_success_message);
    this.props.history.push('/lessons');
  }

  render() {
    return (
      <div>
        <LessonForm
          onChange={this.updateLessonState}
          onSave={this.saveLesson}
          lesson={this.state.lesson}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageLessonPage.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.instanceOf(LessonModel)).isRequired,
  lesson: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

function getLessonById(lessons, id) {
  const lesson = lessons.filter(lesson => lesson.id == id);
  if (lesson) return lesson[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.match.params.id; // from the path `/lesson/:id`

  let lesson = new LessonModel();

  if (lessonId && 0 < state.lessons.length) {
    lesson = getLessonById(state.lessons, lessonId);
  }

  return {
    lessons: state.lessons,
    lesson: lesson,
    loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageLessonPage));
