import { combineReducers } from 'redux';
import loginStatus from './loginStatusReducer';
import loggedInUser from './loggedInUserReducer';
import lessons from './lessonReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    lessons,
    authors,
    loginStatus,
    loggedInUser,
    ajaxCallsInProgress,
    routing: routerReducer
});

export default rootReducer;