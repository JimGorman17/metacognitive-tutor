import React from 'react';
import PropTypes from 'prop-types';
import {Labels} from '../../constants';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            redirectToReferrer: false
        }

        this.responseGoogleTeacher = this.responseGoogleTeacher.bind(this);
        this.responseGoogleStudent = this.responseGoogleStudent.bind(this);        
        this.responseFacebookStudent = this.responseFacebookStudent.bind(this);        
    }

    responseGoogleTeacher = (/*response*/) => {
        this.props.actions.loginTeacher()
        .then(() => {             
            this.setState(() => ({redirectToReferrer: true}));
        });
    }

    responseGoogleStudent = (/*response*/) => {
        this.props.actions.loginStudent()
        .then(() => {             
            this.setState(() => ({redirectToReferrer: true}));
        });
    }
    
    responseFacebookStudent = (/*response*/) => {
        this.props.actions.loginStudent()
        .then(() => {             
            this.setState(() => ({redirectToReferrer: true}));
        });
    }   

    componentDidMount() {    
        this.props.actions.logout();
    }

    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state

      if (redirectToReferrer === true) {
        return <Redirect to={from} />
      }

      // TODO: Legacy, Cleanup
      // <button type="button" className="btn btn-primary" onClick={this.loginAsTeacher}>{Labels.login.log_in_as_a_teacher}</button>
         
  
      return ( // TODO: Refactor - A container component shouldn't render markup.        
        <div className="container">            
            <div className="row justify-content-center mb-4">                
                <GoogleLogin                    
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText={Labels.login.log_in_with_google_as_a_teacher}
                    onSuccess={this.responseGoogleTeacher}
                    //onFailure={responseGoogle} // TODO: Implement
                />
            </div>
            <hr />
            <div className="row justify-content-center mb-4">                
                <GoogleLogin                    
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText={Labels.login.log_in_with_google_as_a_student}
                    onSuccess={this.responseGoogleStudent}
                    // onFailure={responseGoogle} // TODO: Implement
                />
            </div>
            <div className="row justify-content-center">                
                <FacebookLogin                    
                    appId="790631084658439"
                    autoLoad={true}
                    fields="name,email,picture"
                    textButton={Labels.login.log_in_with_facebook_as_a_student}
                    // onClick={componentClicked} // TODO: Implement
                    callback={this.responseFacebookStudent} />
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