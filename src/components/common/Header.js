import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import {Labels, LoginTypeEnum} from '../../constants';
import {connect} from 'react-redux';

// TODO: Cleanup
// <NavLink to="/teacher_admin" className="nav-link" activeClassName="active">{Labels.teacher.admin_page.title}</NavLink>
// <NavLink to="/create_lesson" className="nav-link" activeClassName="active">{Labels.teacher.create_lesson_page.title}</NavLink>
// <NavLink to="/student_main_menu" className="nav-link" activeClassName="active">{Labels.student.main_menu.title}</NavLink>

const Header = ({loading, loginStatus, loggedInUser}) => { // eslint-disable-line
  return (    
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">      
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        {loginStatus &&
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">{Labels.home.title}</NavLink>
          </li>
          {loginStatus == LoginTypeEnum.teacher &&
          <li className="nav-item">
            <NavLink to="/lessons" className="nav-link" activeClassName="active">{Labels.teacher.admin_page.title}</NavLink>
          </li>
          }
          {loginStatus == LoginTypeEnum.teacher &&
          <li className="nav-item">
            <NavLink to="/lesson" className="nav-link" activeClassName="active">{Labels.teacher.create_lesson_page.title}</NavLink>
          </li>
          }          
          {loginStatus == LoginTypeEnum.student &&
          <li className="nav-item">
            <NavLink to="/lessons" className="nav-link" activeClassName="active">{Labels.student.main_menu.title}</NavLink>
          </li>
          }
          {loginStatus == LoginTypeEnum.student &&
          <li className="nav-item">
            <NavLink to="/student_lesson" className="nav-link" activeClassName="active">{Labels.student.lesson_page.title}</NavLink>
          </li>
          }          
        </ul>
        }
      </div>
      <div className="mx-auto order-0">
        {loginStatus &&
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
          <span className="navbar-toggler-icon"></span>
        </button>
        }
        <a className="navbar-brand mx-auto" href="#">{Labels.app_title}</a>
        {loading && <LoadingDots interval={100} dots={20}/>}
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">        
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" activeClassName="active">{Labels.about.title}</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/privacy_policy" className="nav-link" activeClassName="active">{Labels.privacy_policy.title}</NavLink>
          </li>
          <li className="nav-item">            
            <NavLink to="/login" className="nav-link" activeClassName="active">{loginStatus ? Labels.logout.title : Labels.login.title}</NavLink>            
          </li>
        </ul>        
      </div>
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginStatus: PropTypes.number.isRequired
};

function mapStateToProps(state/*, ownProps*/) {    
  return {
      loading: state.ajaxCallsInProgress > 0,
      loginStatus: state.loginStatus,
      loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(Header);