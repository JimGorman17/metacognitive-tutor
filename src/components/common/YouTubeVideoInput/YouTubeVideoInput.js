import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../../constants';
import YoutubeAutocomplete from 'react-youtube-autocomplete';
import {Modal, Button} from 'react-bootstrap/lib';
import YouTubeVideoList from './YouTubeVideoList'
import YouTubeVideoModel from '../../../models/YouTubeVideo';

class YouTubeVideoInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      canDisplayYouTubeResults: true,
      youtubeResults: []
    };

    this.handleClose = this.handleClose.bind(this);
    this.onSearchResultsFound = this.onSearchResultsFound.bind(this);
  }

  handleClose() {
    this.setState({ showModal: false });
    setTimeout(() => {
      this.setState({ canDisplayYouTubeResults: true });
    }, 150);
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
    const {error, label, placeholder} = this.props;

    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <YoutubeAutocomplete
            apiKey="AIzaSyCLhB4-zscDl_jic4l_ekw-hkAZNsxh_fk"
            placeHolder={placeholder}
            callback={this.onSearchResultsFound}
          />
          <Modal show={this.state.showModal} animation={false} onHide={this.handleClose} dialogClassName="modal-lg">
            <Modal.Header>
              <Modal.Title>{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{"height" : "35em", "overflow-y":"auto"}}>
              <YouTubeVideoList youtubevideos={this.state.youtubevideos} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

YouTubeVideoInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default YouTubeVideoInput;
