import {LoginTypeEnum} from '../constants';
import LoginModel from '../models/Login';

export default {
    loginStatus: LoginTypeEnum.logged_out,
    loggedInUser: new LoginModel(),
    lessons: [],
    ajaxCallsInProgress: 0
}