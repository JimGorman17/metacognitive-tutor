import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../../constants';
import YouTubeVideoModel from '../../../models/YouTubeVideo';
import {Image, Button} from 'react-bootstrap/lib';

const YouTubeVideoListRow = ({youtubevideo}) => {
  return (
    <tr>
      <th scope="row">
        <div className="container">
          <div className="row"><Button bsStyle="primary"><i className="fa fa-check fa-fw" aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.select}</Button></div>
          <div className="row"><a href={`https://www.youtube.com/watch?v=${youtubevideo.VideoId}`} target="_blank">{Labels.teacher.lesson_form.manage_lesson.you_tube_video_selection.preview}</a></div>
        </div>
      </th>
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
