// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from './home/HomePage';

// import TeacherAdminPage from './teacherAdmin/TeacherAdminPage'; TODO: Cleanup
// import CreateLessonPage from './createLesson/CreateLessonPage'; TODO: Cleanup
// import StudentMainMenuPage from './studentMainMenu/StudentMainMenuPage'; TODO: Cleanup
import LessonsPage from './lesson/LessonsPage';
import ManageLessonPage from './lesson/ManageLessonPage'; //eslint-disable-line import/no-named-as-default

import StudentLessonPage from './studentLesson/StudentLessonPage';
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

// TODO: Cleanup
// <PrivateRoute path="/teacher_admin" component={TeacherAdminPage} />
// <PrivateRoute path="/create_lesson" component={CreateLessonPage} />
// <PrivateRoute path="/student_main_menu" component={StudentMainMenuPage} />

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
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path="/lessons" component={LessonsPage} />              
              <PrivateRoute path="/lesson/:id" component={ManageLessonPage} />
              <PrivateRoute exact path="/lesson" component={ManageLessonPage} />
              <PrivateRoute path="/student_lesson" component={StudentLessonPage} />              
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
  loginStatus: PropTypes.number.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    loginStatus: state.loginStatus
  };
}

export default withRouter(connect(mapStateToProps)(hot(module)(App)));
