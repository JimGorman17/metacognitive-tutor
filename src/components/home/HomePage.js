import React from 'react';
import {Link} from 'react-router-dom';
import {Labels} from '../../constants';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>{Labels.app_title}</h1>
        <p>{Labels.app_description}</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;
