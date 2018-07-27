import React from 'react';
import PropTypes from 'prop-types';
import StudentLessonAnswerModel from '../../models/StudentLessonAnswer';
import WordScramble from './WordScramble';
import {Labels} from '../../constants';
import '../../styles/word-scramble.css';

const WordScrambleWizardStep = (props) => {
  const {sentences, answers, onChange} = props;
  return(
    <div className="word-scramble-style" style={{marginTop: "2em", marginBottom: "2em"}}>
      <div className="card" style={{opacity: .85}}>
        <div className="card-body">
          <h2 className="card-title">{Labels.student.wizard_steps.word_scramble.title}</h2>
          <p className="card-text">
            OK. Now {"let's"} have some fun.<br /><br />
            Your teacher chose some key sentences from the story you just read.<br /><br />
            Reassemble each group of scrambled words into sentences that make sense.<br /><br />
          </p>
        </div>
      </div>
      <WordScramble sentences={sentences} answers={answers} onChange={onChange} />
    </div>
  );
};

WordScrambleWizardStep.propTypes = {
  sentences: PropTypes.arrayOf(PropTypes.string).isRequired,
  answers: PropTypes.arrayOf(PropTypes.instanceOf(StudentLessonAnswerModel)).isRequired,
  onChange: PropTypes.func.isRequired
};

export default WordScrambleWizardStep;