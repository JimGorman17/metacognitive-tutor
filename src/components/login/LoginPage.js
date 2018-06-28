import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';
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
        <div className="jumbotron">
            <div className="container">
                <div className="row form-group">
                    <div className="col-md-offset-3 col-xs-offset-3 col-md-12 col-xs-12">
                        <h1>{Labels.app_title}</h1>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-offset-4 col-xs-offset-4 col-md-12 col-xs-12">
                        <button type="button" className="btn btn-primary" onClick={this.login}>Log in as a Teacher</button>                        
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-offset-4 col-xs-offset-4 col-md-12 col-xs-12">                        
                        <button type="button" className="btn btn-primary" onClick={this.login}>Log in as a Student</button>
                    </div>
                </div>
            </div>            
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