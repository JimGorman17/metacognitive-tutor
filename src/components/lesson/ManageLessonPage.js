import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from "react-router-dom";
import * as lessonActions from '../../actions/lessonActions';
import LessonForm from './LessonForm';
import {Labels} from '../../constants';
import toastr from 'toastr';
import YoutubeAutocomplete from 'react-youtube-autocomplete';
import {Modal, Button} from 'react-bootstrap/lib';
import YouTubeVideoList from './YouTubeVideoList'
import YouTubeVideoModel from '../../models/YouTubeVideo';
import LessonModel from '../../models/Lesson';

export class ManageLessonPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lesson: Object.assign({}, props.lesson),
      errors: {},
      saving: false,
      showModal: false,
      canDisplayYouTubeResults: true,
      youtubeResults: []
    };

    this.updateLessonState = this.updateLessonState.bind(this);
    this.saveLesson = this.saveLesson.bind(this);
    this.onSearchResultsFound = this.onSearchResultsFound.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lesson.id != nextProps.lesson.id) {
      // Necessary to populate form when existing lesson is loaded directly.
      this.setState({lesson: Object.assign({}, nextProps.lesson)});
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
    toastr.success(Labels.teacher.create_lesson_page.lesson_saved_success_message);
    this.props.history.push('/lessons');
  }

  handleClose() {
    this.setState({ showModal: false });
    setTimeout(() => {
      this.setState({ canDisplayYouTubeResults: true });
    }, 75);
  }

  onSearchResultsFound(results) {
    if (this.state && this.state.canDisplayYouTubeResults) {
      this.setState({ youtubevideos: results.map(youtubevideo => new YouTubeVideoModel({
        VideoId: youtubevideo.id.videoId,
        Title: youtubevideo.snippet.title,
        Description: youtubevideo.snippet.description,
        ImageUrl: youtubevideo.snippet.thumbnails.default.url
      })), showModal: true, canDisplayYouTubeResults: false });
    }
  }

  render() {
    return (
      <div>
        <YoutubeAutocomplete
          apiKey="AIzaSyCLhB4-zscDl_jic4l_ekw-hkAZNsxh_fk"
          placeHolder="Search Youtube"
          callback={this.onSearchResultsFound}
        />
        <Modal show={this.state.showModal} animation={false} onHide={this.handleClose} dialogClassName="modal-lg">
          <Modal.Header>
            <Modal.Title>{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{"height" : "40em", "overflow-y":"auto"}}>
            <YouTubeVideoList youtubevideos={this.state.youtubevideos} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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
  lesson: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function getLessonById(lessons, id) {
  const lesson = lessons.filter(lesson => lesson.id == id);
  if (lesson) return lesson[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.match.params.id; // from the path `/lesson/:id`

  let lesson = new LessonModel();

  if (lessonId && state.lessons.length > 0) {
    lesson = getLessonById(state.lessons, lessonId);
  }

  return {
    lesson: lesson
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lessonActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageLessonPage));
