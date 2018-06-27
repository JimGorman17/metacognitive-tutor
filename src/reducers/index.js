import { combineReducers } from 'redux';
import logins from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    logins,
    ajaxCallsInProgress,
    routing: routerReducer
});

export default rootReducer;