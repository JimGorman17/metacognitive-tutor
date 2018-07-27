import React from 'react';
import PropTypes from 'prop-types';
import CardPyramid from './CardPyramid';
import {Labels} from '../../constants';
import '../../styles/card-pyramid.css';

const CardPyramidWizardStep = (props) => {
  const {mainIdea, supportingIdea, storyDetails, onChange} = props;
  return(
    <div className="pyramid-style" style={{marginTop: "2em", marginBottom: "2em"}}>
      <div className="card" style={{opacity: .8}}>
        <div className="card-body">
          <h2 className="card-title">{Labels.student.wizard_steps.card_pyramid.title}</h2>
          <p className="card-text">
            OK. Hope you liked the book.<br /><br />
            {"Let's"} review what you just read.<br /><br />
            Assemble a three-level card pyramid by dragging all ideas from left to right.<br /><br />
          </p>
        </div>
      </div>
      <CardPyramid mainIdea={mainIdea} supportingIdea={supportingIdea} storyDetails={storyDetails} onChange={onChange} />
    </div>
  );
};

CardPyramidWizardStep.propTypes = {
  mainIdea: PropTypes.string.isRequired,
  supportingIdea: PropTypes.string.isRequired,
  storyDetails: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CardPyramidWizardStep;