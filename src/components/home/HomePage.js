import React from 'react';
import {Link} from 'react-router-dom';
import {Labels} from '../../constants';

class HomePage extends React.Component {
  /*
  componentDidMount() {    
    // TODO: Remove - Exists to test CORS.
    fetch(`${process.env.__API_URL__}/hello/bob?format=json`)
      .then(response => response.json())
      .then(data => alert(data.result));
  }
  */

  render() {
    return (
      <div className="jumbotron">
        <h1>{Labels.app_title}</h1>
        <p>{Labels.app_description}</p>
        <Link to="about" className="btn btn-primary btn-lg">{Labels.home.learn_more}</Link>
      </div>
    );
  }  
}

export default HomePage;
