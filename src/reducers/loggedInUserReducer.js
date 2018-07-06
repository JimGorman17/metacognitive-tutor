import * as types from '../actions/actionTypes';
import initialState from './initialState';
import LoginModel from '../models/Login';

export default function loginReducer(state = initialState.loggedInUser, action) {    
    if (action.type == types.LOGIN_TEACHER_SUCCESS) {
        return action.teacher;
    } else if (action.type == types.LOGIN_STUDENT_SUCCESS) {
        return action.student;
    } else if (action.type == types.LOGOUT_SUCCESS) {
        return new LoginModel();
    }

    return state;
}
