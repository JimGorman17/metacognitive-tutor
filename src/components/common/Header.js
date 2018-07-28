import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import {Labels, LoginTypeEnum} from '../../constants';
import LoginModel from '../../models/Login';
import {Image} from 'react-bootstrap/lib';
import {connect} from 'react-redux';

const Header = ({loading, loginStatus, loggedInUser}) => { // eslint-disable-line
  return (
    <div>
      <header className="py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-3 pt-1"/>
          <div className="col-6 text-center">
            <div className="container">
              <div className="row">
                <div className="col-1" />
                <div className="col-10" style={{marginBottom: "-3em"}}>
                  <div className="container">
                    <div className="row">
                      <div className="col-2">
                        <Image src={require('../../images/reading-72-214313.png')} alt={Labels.app_title} style={{width: "auto", maxHeight: "55%", marginTop: "-.25em"}} />
                      </div>
                      <div className="col-10">
                        <h4>{Labels.app_title}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1" />
              </div>
            </div>
            {loading && <LoadingDots interval={100} dots={20}/>}
          </div>
          <div className="col-3 d-flex justify-content-end align-items-center">
            <NavLink onClick={() => { if (loginStatus){ location.reload(true); } }} to="/login" className="btn btn-sm btn-outline-secondary"><i className={`fa ${loginStatus ? "fa-sign-out" : "fa-sign-in"} fa-fw`} aria-hidden="true" />&nbsp; {loginStatus ? Labels.logout.title : Labels.login.title}</NavLink>
          </div>
        </div>
      </header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          {loginStatus &&
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active"><i className="fa fa-home fa-fw" aria-hidden="true" />&nbsp; {Labels.home.title}</NavLink>
            </li>
            {loginStatus !== LoginTypeEnum.logged_out &&
            <li className="nav-item">
              <NavLink to="/lessons" className="nav-link" activeClassName="active"><i className="fa fa-university fa-fw" aria-hidden="true" />&nbsp; {Labels.teacher.admin_page.title}</NavLink>
            </li>
            }
            {loginStatus === LoginTypeEnum.teacher &&
            <li className="nav-item">
              <NavLink to="/lesson" className="nav-link" activeClassName="active"><i className="fa fa-plus fa-fw" aria-hidden="true" />&nbsp; {Labels.teacher.create_lesson_page.title}</NavLink>
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
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" activeClassName="active"><i className="fa fa-info-circle fa-fw" aria-hidden="true" />&nbsp; {Labels.about.title}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/privacy_policy" className="nav-link" activeClassName="active"><i className="fa fa-lock fa-fw" aria-hidden="true" />&nbsp; {Labels.privacy_policy.title}</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginStatus: PropTypes.string.isRequired,
  loggedInUser: PropTypes.instanceOf(LoginModel).isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
      loading: state.ajaxCallsInProgress > 0,
      loginStatus: state.loginStatus,
      loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(Header);