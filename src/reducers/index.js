import { combineReducers } from 'redux';
import loginStatus from './loginReducer';
import lessons from './lessonReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    lessons,
    authors,
    loginStatus,
    ajaxCallsInProgress,
    routing: routerReducer
});

export default rootReducer;