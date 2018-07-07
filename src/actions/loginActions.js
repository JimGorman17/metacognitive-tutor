import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginTeacherSuccess(teacher){
    return {type: types.LOGIN_TEACHER_SUCCESS, teacher};
}

export function loginStudentSuccess(student){
    return {type: types.LOGIN_STUDENT_SUCCESS, student};
}

export function logoutSuccess(){
    return {type: types.LOGOUT_SUCCESS};
}

export function loginTeacher(loginModel) {
    return function (dispatch) {
      dispatch(beginAjaxCall());
      return loginApi.login(loginModel)
        .then(() => dispatch(loginTeacherSuccess(loginModel)))
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
  }

  export function loginStudent(loginModel) {
    return function (dispatch) {
      dispatch(beginAjaxCall());
      return loginApi.login(loginModel)
        .then(() => dispatch(loginStudentSuccess(loginModel)))
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
  }

  export function logout() {
    return function (dispatch) {
      dispatch(beginAjaxCall());
      return loginApi.logout()
        .then(() => dispatch(logoutSuccess()))
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
  }