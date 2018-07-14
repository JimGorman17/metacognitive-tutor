// Originated from https://raw.githubusercontent.com/hackingbeauty/react-youtube-autocomplete/master/src/OptionsTemplate.js on 07/14/2018

import React from 'react';
import PropTypes from 'prop-types';

const OptionsTemplate = ({data}) => {
  const searchResult = data[0];
  return (
      <div>{searchResult}</div>
  );
}

OptionsTemplate.propTypes = {
  data: PropTypes.array.isRequired
};

export default OptionsTemplate;