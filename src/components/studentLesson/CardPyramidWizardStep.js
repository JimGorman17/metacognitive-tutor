import React from 'react';
import PropTypes from 'prop-types';
import CardPyramid from './CardPyramid';
import {Labels} from '../../constants';
import '../../styles/card-pyramid.css';

const CardPyramidWizardStep = (props) => {
  const {mainIdea, supportingIdea, storyDetails} = props;
  return(
    <div className="pyramid-style" style={{marginTop: "2em", marginBottom: "2em"}}>
      <div className="card" style={{opacity: .8}}>
        <div className="card-body">
          <h5 className="card-title">{Labels.student.wizard_steps.card_pyramid.title}</h5>
          <p className="card-text">
            OK. Hope you liked the book.<br /><br />
            {"Let's"} review what you just read.
          </p>
        </div>
      </div>
      <CardPyramid mainIdea={mainIdea} supportingIdea={supportingIdea} storyDetails={storyDetails} />
    </div>
  );
};

CardPyramidWizardStep.propTypes = {
  mainIdea: PropTypes.string.isRequired,
  supportingIdea: PropTypes.string.isRequired,
  storyDetails: PropTypes.array.isRequired
};

export default CardPyramidWizardStep;