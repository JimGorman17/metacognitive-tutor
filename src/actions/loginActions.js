import * as types from './actionTypes';

export function loginTeacherSuccess(teacher){
    return {type: types.LOGIN_TEACHER_SUCCESS, teacher};
}

export function loginStudentSuccess(student){
    return {type: types.LOGIN_STUDENT_SUCCESS, student};
}

export function logoutSuccess(){
    return {type: types.LOGOUT_SUCCESS};
}