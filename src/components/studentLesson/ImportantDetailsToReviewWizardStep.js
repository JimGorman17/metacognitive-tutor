import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';

const ImportantDetailsToReviewWizardStep = (props) => {
  const {mainIdea, supportingIdea, storyDetails} = props;
  return(
    <div style={{marginTop: "2em", marginBottom: "2em"}}>
      <h2>{Labels.student.wizard_steps.important_details_to_review.title}</h2>
      <p>OK. Hope you liked the book.</p>
      <p>{"Let's"} review what you just read.</p>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">The main idea was:</h5>
          <p className="card-text">
            {mainIdea}
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">The supporting idea was:</h5>
          <p className="card-text">
            {supportingIdea}
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Some important story details were:</h5>
          <p className="card-text">
            <ul>
              {storyDetails.map(sd => <li key={sd}>{sd}</li>)}
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

ImportantDetailsToReviewWizardStep.propTypes = {
  mainIdea: PropTypes.string.isRequired,
  supportingIdea: PropTypes.string.isRequired,
  storyDetails: PropTypes.array.isRequired
};

export default ImportantDetailsToReviewWizardStep;