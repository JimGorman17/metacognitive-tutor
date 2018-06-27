// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import { Route, Switch } from "react-router-dom";
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute';
import LoginPage from './login/LoginPage';
import SamplePage from './login/SamplePage'; // TODO: Remove - Just for proof of concept.
import { hot } from 'react-hot-loader';
import {connect} from 'react-redux';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage} />    
            <PrivateRoute path="/about" component={AboutPage} />
            <PrivateRoute path="/helloworld" component={() => <SamplePage name="Sally" />} />
            <PrivateRoute component={NotFoundPage} />          
        </Switch>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loginStatus: PropTypes.number.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    loginStatus: state.loginStatus
  };
}

export default connect(mapStateToProps)(hot(module)(App));
