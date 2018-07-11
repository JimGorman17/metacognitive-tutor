import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
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
          <Modal.Body style={{"height" : "35em", "overflow-y":"auto"}}>
            <YouTubeVideoList youtubevideos={this.state.youtubevideos} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default YouTubeVideoInput;
