import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            redirectToReferrer: false
        }

        this.login = this.login.bind(this);
    }
    
    login = () => {
        this.props.actions.loginTeacher()
        .then(() => {
            debugger;  
            this.setState(() => ({redirectToReferrer: true}));
        });      
    }
    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state
      
      if (redirectToReferrer === true) {
        return <Redirect to={from} />
      }
  
      return ( // TODO: Refactor - A container component shouldn't render markup.
        <div>
          <p>You must log in to view the page</p>
          <button onClick={this.login}>Log in</button>
        </div>
      )
    }
  }

LoginPage.propTypes = {
    location: PropTypes.object.isRequired,
    loginStatus: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        loginStatus: state.loginStatus
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(loginActions, dispatch)
    };
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));