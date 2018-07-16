import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';
import LoginModel from '../../models/Login';
import {Link} from 'react-router-dom';

const CongratulationsWizardStep = (props) => {
  const {bookTitle, lessonAuthor} = props;
  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      <h2>{Labels.student.wizard_steps.congratulations.title}!</h2>
      <p>{"You've"} finished the {Labels.app_title} lesson about the book <u>{bookTitle}</u>, authored by {lessonAuthor.name}!</p>
      <p>Feel free to try more lessons on the main menu.</p>
      <Link to="/lessons" className="btn btn-primary btn-lg">{Labels.student.main_menu.title}</Link>
    </div>
  );
};

CongratulationsWizardStep.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    lessonAuthor: PropTypes.instanceOf(LoginModel).isRequired
};

export default CongratulationsWizardStep;