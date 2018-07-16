import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';

const WelcomeWizardStep = (props) => {
  const {bookTitle, bookAmazonUrl} = props;
  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      <h1>{Labels.student.wizard_steps.welcome.title}</h1>
      <p>Welcome to {Labels.app_title}!</p>
      <p>This application will help develop your metacognitive reading strategies.</p>
      <p>Today, we will be focusing on a book titled <b>{bookTitle}</b>.</p>
      <p>If you {"don't"} already own a copy of the book, you can buy it here: <a href={bookAmazonUrl} target="_blank">{bookTitle}</a>.</p>
    </div>
  );
};

WelcomeWizardStep.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAmazonUrl: PropTypes.string.isRequired
};

export default WelcomeWizardStep;