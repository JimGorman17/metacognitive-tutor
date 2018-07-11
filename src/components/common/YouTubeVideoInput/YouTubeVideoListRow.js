import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../../constants';
import YouTubeVideoModel from '../../../models/YouTubeVideo';
import {Image} from 'react-bootstrap/lib';

const YouTubeVideoListRow = ({youtubevideo}) => {
  return (
    <tr>
      <th scope="row"><a href={`https://www.youtube.com/watch?v=${youtubevideo.VideoId}`} target="_blank">{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.watch}</a></th>
      <td>{youtubevideo.Title}</td>
      <td>{youtubevideo.Description}</td>
      <td><Image src={youtubevideo.ImageUrl} alt={youtubevideo.Title} /></td>
    </tr>
  );
};

YouTubeVideoListRow.propTypes = {
  youtubevideo: PropTypes.instanceOf(YouTubeVideoModel).isRequired
};

export default YouTubeVideoListRow;
