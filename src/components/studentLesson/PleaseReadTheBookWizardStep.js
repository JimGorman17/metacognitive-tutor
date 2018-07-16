import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from 'react-bootstrap/lib';

const TextWizardStep = (title, text, hasInput) => {
    return(
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
        {hasInput &&
        <FormControl
          type="text"
          //value={this.state.value}
          //placeholder="Enter text"
          onChange={this.handleChange}
        />
        }
      </div>
    );
};

TextWizardStep.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    hasInput: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
};

export default TextWizardStep;