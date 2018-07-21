import React from 'react';
import PropTypes from 'prop-types';
import YouTubeVideoModel from '../../../models/YouTubeVideo';
import YouTubeVideoListRow from './YouTubeVideoListRow';
import {Labels} from '../../../constants';

const YouTubeVideoList = ({youtubevideos, onSelected}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">&nbsp;</th>
          <th scope="col">{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.column_headers.title}</th>
          <th scope="col">{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.column_headers.description}</th>
          <th scope="col">{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.column_headers.image}</th>
        </tr>
      </thead>
      <tbody>
      {youtubevideos.map(youtubevideo =>
        <YouTubeVideoListRow key={youtubevideo.videoId} youtubevideo={youtubevideo} onSelected={onSelected} />
      )}
      </tbody>
    </table>
  );
};

YouTubeVideoList.propTypes = {
  youtubevideos: PropTypes.arrayOf(PropTypes.instanceOf(YouTubeVideoModel)),
  onSelected: PropTypes.func.isRequired
};

export default YouTubeVideoList;
