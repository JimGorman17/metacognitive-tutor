// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from './home/HomePage';
import TeacherAdminPage from './teacherAdmin/TeacherAdminPage';
import LessonsPage from './lesson/LessonsPage';
import ManageLessonPage from './lesson/ManageLessonPage'; //eslint-disable-line import/no-named-as-default
import StudentLessonPage from './studentLesson/StudentLessonPage';
import AboutPage from './about/AboutPage';
import PrivacyPolicyPage from './privacyPolicy/PrivacyPolicyPage';
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
          loginStatus={this.props.loginStatus}
        />
        <div className="jumbotron">
          <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/privacy_policy" component={PrivacyPolicyPage} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path="/lessons" component={LessonsPage} />
              <PrivateRoute path="/lesson/:id?" component={ManageLessonPage} />
              <PrivateRoute path="/student_lesson/:id" component={StudentLessonPage} />
              <PrivateRoute path="/teacher_admin" component={TeacherAdminPage} />
              <PrivateRoute path="/helloworld" component={() => <SamplePage name="Sally" />} />
              <PrivateRoute component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool.isRequired,
  loginStatus: PropTypes.string.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
    loading: 0 < state.ajaxCallsInProgress,
    loginStatus: state.loginStatus
  };
}

export default withRouter(connect(mapStateToProps)(hot(module)(App)));
