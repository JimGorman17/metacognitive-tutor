import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../../constants';
import YoutubeAutocomplete from './YoutubeAutocomplete';
import {Modal, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, FormControl} from 'react-bootstrap/lib';
import YouTubeVideoList from './YouTubeVideoList'
import YouTubeVideoModel from '../../../models/YouTubeVideo';

class YouTubeVideoInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeOption: 1,
      showModal: false,
      canDisplayYouTubeResults: true,
      youtubeResults: []
    };

    this.onOptionChange = this.onOptionChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSearchResultsFound = this.onSearchResultsFound.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected(youTubeVideo) {
    const {name, onChange} = this.props;
    onChange({target: {name: name, value: youTubeVideo }});
    this.handleClose();
  }

  onOptionChange(option) {
    this.setState({ activeOption: option });
  }

  handleClose() {
    this.setState({ showModal: false });
    setTimeout(() => {
      this.setState({ canDisplayYouTubeResults: true });
    }, 500);
  }

  onSearchResultsFound(results) {
    if (this.state && this.state.canDisplayYouTubeResults) {
      this.setState({ youtubevideos: results.map(youtubevideo => new YouTubeVideoModel({
        videoId: youtubevideo.id.videoId,
        title: youtubevideo.snippet.title,
        description: youtubevideo.snippet.description,
        imageUrl: youtubevideo.snippet.thumbnails.default.url
      })), showModal: true, canDisplayYouTubeResults: false });
    }
  }

  render() {
    const {error, label, placeholder, name, onChange, value} = this.props;

    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <YoutubeAutocomplete
                  apiKey="AIzaSyCLhB4-zscDl_jic4l_ekw-hkAZNsxh_fk"
                  placeHolder={placeholder}
                  callback={this.onSearchResultsFound}
                  disabled={this.state.activeOption !== 1}
                />
              </div>
              <div className="col-md-4">
                <ButtonToolbar>
                  <ToggleButtonGroup className="btn-group-toggle" onChange={this.onOptionChange} type="radio" name={`options-${name}`} defaultValue={1}>
                    <ToggleButton value={1}>Search</ToggleButton>
                    <ToggleButton value={2}>Direct Input</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>
              <div className="col-md-3">
                <FormControl
                  type="text"
                  readOnly={this.state.activeOption !== 2}
                  value={value.url}
                  onChange={(url) => onChange({target: {name: name, value: new YouTubeVideoModel({url: url}) }})}
                />
              </div>
            </div>
          </div>
          <Modal show={this.state.showModal} animation={false} onHide={this.handleClose} dialogClassName="modal-lg">
            <Modal.Header>
              <Modal.Title>{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{"height" : "35em", "overflowY":"auto"}}>
              <YouTubeVideoList youtubevideos={this.state.youtubevideos} onSelected={this.onSelected} />
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
  value: PropTypes.instanceOf(YouTubeVideoModel),
  error: PropTypes.string
};

YouTubeVideoInput.defaultProps = {
  value: new YouTubeVideoModel()
};

export default YouTubeVideoInput;
