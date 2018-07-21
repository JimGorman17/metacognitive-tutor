import React from 'react';
import {Link} from 'react-router-dom';
import {Labels} from '../../constants';

class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mb-1">
          <div className="col-md-12">
            <h1>{Labels.app_title}</h1>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-5">
            <img src="../../images/teacher_teaching_kids_how_to_read.jpg" />
          </div>
          <div className="col-md-7">
            {Labels.app_description}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="about" className="btn btn-primary btn-lg">{Labels.home.learn_more}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
