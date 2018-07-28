import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import YouTubeVideoModel from '../../models/YouTubeVideo';

const YouTubeVideoWizardStep = (props) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const {youTubeVideo, explanationText} = props;
  const videoId = youTubeVideo.videoId ? youTubeVideo.videoId : (youTubeVideo.url.indexOf("?v=") !== -1 ? youTubeVideo.url.substring(youTubeVideo.url.indexOf("?v=") + 3): youTubeVideo.url.substring(youTubeVideo.url.lastIndexOf('/') + 1));

  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      {explanationText &&
      <div className="card">
        <div className="card-body">
          {explanationText}
        </div>
      </div>
      }
      <YouTube
          videoId={videoId}
          opts={opts}
        />
    </div>
  );
};

YouTubeVideoWizardStep.propTypes = {
  youTubeVideo: PropTypes.instanceOf(YouTubeVideoModel),
  explanationText: PropTypes.string
};

export default YouTubeVideoWizardStep;