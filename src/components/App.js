// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import { Route, Switch } from "react-router-dom";
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import NotFoundPage from "./NotFoundPage";
import { hot } from 'react-hot-loader';

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
            <Route exact path="/" component={HomePage} />    
            <Route path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />          
        </Switch>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default hot(module)(App);
