import React from 'react';
import PropTypes from 'prop-types';
import YouTubeVideoModel from '../../models/YouTubeVideo';
import YouTubeVideoListRow from './YouTubeVideoListRow';
import {Labels} from '../../constants';

const YouTubeVideoList = ({youtubevideos}) => {
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
        <YouTubeVideoListRow key={youtubevideo.VideoId} youtubevideo={youtubevideo}/>
      )}
      </tbody>
    </table>
  );
};

YouTubeVideoList.propTypes = {
  youtubevideos: PropTypes.arrayOf(YouTubeVideoModel)
};

export default YouTubeVideoList;
