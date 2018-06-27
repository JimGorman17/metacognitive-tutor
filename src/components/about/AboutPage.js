import React from 'react';
import {Labels} from '../../constants';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>{Labels.about.title}</h1>
        <p>{Labels.about.description}</p>
      </div>
    );
  }
}

export default AboutPage;
