import React from 'react';
import PropTypes from 'prop-types';

const HelloWorld = (props) => {
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

HelloWorld.propTypes = {
    name: PropTypes.string.isRequired
};

export default HelloWorld;