import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap/lib';

const StoryQuestionsWizardStep = (props) => {
  const {questions} = props;
  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      <h2>{Labels.student.wizard_steps.story_questions.title}</h2>
      <p>OK. {"Let's"} answers some questions about what you just read.</p>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Questions:</h5>
          <p className="card-text">
            <ol>
              {questions.map((q, index) => <li key={index}>{q}</li>)}
            </ol>
          </p>
        </div>
      </div>
      <FormGroup style={{marginTop: "1.5em"}} controlId="formControlsTextarea">
        <ControlLabel>{Labels.student.wizard_steps.story_questions.your_answers}:</ControlLabel>
        <FormControl componentClass="textarea" />
      </FormGroup>
    </div>
  );
};

StoryQuestionsWizardStep.propTypes = {
  questions: PropTypes.array.isRequired
};

export default StoryQuestionsWizardStep;