import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';

const PleaseReadTheBookWizardStep = (props) => {
  const {bookTitle, bookAmazonUrl} = props;
  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      <h2>{Labels.student.wizard_steps.please_read_the_book.title}</h2>
      <p>OK. Now {"it's"} time to read the book, <u>{bookTitle}</u>!</p>
      <p>Remember, if you {"don't"} already own a copy of the book, you can buy it here: <a href={bookAmazonUrl} target="_blank">{bookTitle}</a>.</p>
      <p>After {"you've"} finished reading, you can resume this lesson at any time.</p>
    </div>
  );
};

PleaseReadTheBookWizardStep.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAmazonUrl: PropTypes.string.isRequired
};

export default PleaseReadTheBookWizardStep;