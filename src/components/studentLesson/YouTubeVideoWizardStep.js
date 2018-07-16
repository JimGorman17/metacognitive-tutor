import React from 'react';
import PropTypes from 'prop-types';

const YouTubeVideoWizardStep = (props) => { // TODO: Delete this. Just for copy-paste purposes
    const sayHi = (event) => { // eslint-disable-line
        alert(`Hi ${props.name}`);
    }

    return(
        <div>
            <a
                href="#"
                onClick={sayHi}>Say Hi</a>
        </div>
    );
};

YouTubeVideoWizardStep.propTypes = {
    name: PropTypes.string.isRequired
};

export default YouTubeVideoWizardStep;