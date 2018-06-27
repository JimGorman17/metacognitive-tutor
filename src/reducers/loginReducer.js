import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {LoginTypeEnum} from '../constants';

export default function loginReducer(state = initialState.loginStatus, action) {
  if (action.type == types.LOGIN_TEACHER_SUCCESS) {
    return LoginTypeEnum.teacher;
  } else if (action.type == types.LOGIN_STUDENT_SUCCESS) {
    return LoginTypeEnum.student;
  } else if (action.type == types.LOGOUT_SUCCESS) {
    return null;
  }

  return state;
}
