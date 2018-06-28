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

        this.loginAsTeacher = this.loginAsTeacher.bind(this);
        this.loginAsStudent = this.loginAsStudent.bind(this);
    }
    
    loginAsTeacher = () => {
        this.props.actions.loginTeacher()
        .then(() => {             
            this.setState(() => ({redirectToReferrer: true}));
        });      
    }

    loginAsStudent = () => {
        this.props.actions.loginStudent()
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
        <div className="container">            
            <div className="row justify-content-center mb-4">         
                <button type="button" className="btn btn-primary" onClick={this.loginAsTeacher}>{Labels.login.log_in_as_a_teacher}</button>                    
            </div>
            <div className="row justify-content-center">         
                <button type="button" className="btn btn-primary" onClick={this.loginAsStudent}>{Labels.login.log_in_as_a_student}</button>                    
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