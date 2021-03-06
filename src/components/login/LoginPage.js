import React from 'react';
import PropTypes from 'prop-types';
import {Labels, LoginServiceEnum} from '../../constants';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginModel from '../../models/Login';
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

    responseGoogleTeacher = (response) => {
        const profileObj = response.profileObj;
        this.props.actions.loginTeacher(new LoginModel({
            name: profileObj.name,
            token: response.accessToken,
            email: profileObj.email,
            provider: LoginServiceEnum.google,
            providerId: response.googleId,
            providerPic: profileObj.imageUrl,
            isTeacher: true,
            isStudent: false,
        }))
        .then(() => {
            this.setState(() => ({redirectToReferrer: true}));
        });
    }

    responseFacebookTeacher = (response) => {
      this.props.actions.loginTeacher(new LoginModel({
          name: response.name,
          token: response.accessToken,
          email: response.email,
          provider: LoginServiceEnum.facebook,
          providerId: response.id,
          providerPic: response.picture.data.url,
          isTeacher: true,
          isStudent: false,
      }))
      .then(() => {
          this.setState(() => ({redirectToReferrer: true}));
      });
    }

    responseGoogleStudent = (response) => {
        const profileObj = response.profileObj;
        this.props.actions.loginStudent(new LoginModel({
            name: profileObj.name,
            token: response.accessToken,
            email: profileObj.email,
            provider: LoginServiceEnum.google,
            providerId: response.googleId,
            providerPic: profileObj.imageUrl,
            isTeacher: false,
            isStudent: true,
        }))
        .then(() => {
            this.setState(() => ({redirectToReferrer: true}));
        });
    }

    responseFacebookStudent = (response) => {
        this.props.actions.loginStudent(new LoginModel({
            name: response.name,
            token: response.accessToken,
            email: response.email,
            provider: LoginServiceEnum.facebook,
            providerId: response.id,
            providerPic: response.picture.data.url,
            isTeacher: false,
            isStudent: true,
        }))
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

      return (
        <div className="container">
          <div className="row justify-content-center mb-2">
            <h5>{Labels.login.teachers}</h5>
          </div>
          <div className="row justify-content-center mb-2">
            <GoogleLogin
              className="loginBtn loginBtn--google"
              clientId="484376358445-829ke8v1h3k9g1vr27doi1pcja8740t7.apps.googleusercontent.com"
              buttonText={Labels.login.log_in_as_a_teacher}
              onSuccess={this.responseGoogleTeacher}
              //onFailure={responseGoogle} // TODO: Implement
            />
          </div>
          <div className="row justify-content-center mb-4">
            <FacebookLogin
              cssClass="loginBtn loginBtn--facebook"
              appId="790631084658439"
              autoLoad={false}
              fields="name,email,picture"
              textButton={Labels.login.log_in_as_a_teacher}
              // onClick={componentClicked} // TODO: Implement
              callback={this.responseFacebookTeacher}
            />
          </div>
          <hr />
          <div className="row justify-content-center mb-2">
            <h5>{Labels.login.students}</h5>
          </div>
          <div className="row justify-content-center mb-2">
            <GoogleLogin
              className="loginBtn loginBtn--google"
              clientId="484376358445-829ke8v1h3k9g1vr27doi1pcja8740t7.apps.googleusercontent.com"
              buttonText={Labels.login.log_in_as_a_student}
              onSuccess={this.responseGoogleStudent}
              // onFailure={responseGoogle} // TODO: Implement
            />
          </div>
          <div className="row justify-content-center">
            <FacebookLogin
              cssClass="loginBtn loginBtn--facebook"
              appId="790631084658439"
              autoLoad={false}
              fields="name,email,picture"
              textButton={Labels.login.log_in_as_a_student}
              // onClick={componentClicked} // TODO: Implement
              callback={this.responseFacebookStudent}
            />
          </div>
        </div>
      )
    }
}

LoginPage.propTypes = {
    location: PropTypes.object.isRequired,
    loginStatus: PropTypes.string.isRequired,
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