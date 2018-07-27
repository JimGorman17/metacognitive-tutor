import React from 'react';
import PropTypes from 'prop-types';
import {Labels, QuestionTypeEnum} from '../../constants';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap/lib';
import StudentLessonAnswerModel from '../../models/StudentLessonAnswer';

const StoryQuestionsWizardStep = (props) => {
  const {questions, onChange, answers} = props;
  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      <h2>{Labels.student.wizard_steps.story_questions.title}</h2>
      <p>OK. {"Let's"} answer some questions about what you just read.</p>
      <ol>{questions.map((q, index) =>
        <li key={index}>
          <FormGroup style={{marginTop: "1.5em"}} controlId="formControlsTextarea">
            <ControlLabel>{q}:</ControlLabel>
            <FormControl
              componentClass="textarea"
              onChange={(event) => onChange(QuestionTypeEnum.story_question, index + 1, event.target.value)}
              value={answers[index] != null ? answers[index].answer : ""}
            />
          </FormGroup>
        </li>)
      }
      </ol>
    </div>
  );
};

StoryQuestionsWizardStep.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.string)).isRequired,
  answers: PropTypes.arrayOf(PropTypes.instanceOf(StudentLessonAnswerModel)).isRequired,
  onChange: PropTypes.func.isRequired
};

export default StoryQuestionsWizardStep;