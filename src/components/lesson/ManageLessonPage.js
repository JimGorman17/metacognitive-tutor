import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lessonActions from '../../actions/lessonActions';
import LessonForm from './LessonForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

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

  updateLessonState(event) {
    const field = event.target.name;
    let lesson = Object.assign({}, this.lesson.course);
    lesson[field] = event.target.value;
    return this.setState({lesson: lesson});
  }

  lessonFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.lesson.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveLesson(event) {
    event.preventDefault();

    if (!this.lessonFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveLesson(this.state.lesson)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Lesson saved');
    this.context.router.push('/lessons');
  }

  render() {
    return (
      <LessonForm
        allAuthors={this.props.authors}
        onChange={this.updateLessonState}
        onSave={this.saveLesson}
        lesson={this.state.lesson}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageLessonPage.propTypes = {
  lesson: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageLessonPage.contextTypes = {
  router: PropTypes.object
};

function getLessonById(lessons, id) {
  const lesson = lessons.filter(lesson => lesson.id == id);
  if (lesson) return lesson[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.params.id; // from the path `/lesson/:id`

  let lesson = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (lessonId && state.lessons.length > 0) {
    lesson = getLessonById(state.lessons, lessonId);
  }

  return {
    lesson: lesson,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLessonPage);
