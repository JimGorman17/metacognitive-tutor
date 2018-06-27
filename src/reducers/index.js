import { combineReducers } from 'redux';
import loginStatus from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    loginStatus,
    ajaxCallsInProgress,
    routing: routerReducer
});

export default rootReducer;