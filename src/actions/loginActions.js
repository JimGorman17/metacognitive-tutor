import * as types from './actionTypes';
import loginApi from '../api/mockLoginApi';
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

export function loginTeacher(teacher) {
    return function (dispatch) {
      dispatch(beginAjaxCall());
      return loginApi.loginTeacher(teacher)
        .then(teacher => dispatch(loginTeacherSuccess(teacher)))
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
  }

  export function loginStudent(student) {
    return function (dispatch) {
      dispatch(beginAjaxCall());
      return loginApi.loginStudent(student)
        .then(student => dispatch(loginStudentSuccess(student)))
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
  }