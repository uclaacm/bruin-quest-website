import { combineReducers } from 'redux';
import user from './user_reducer';
import admin from './admin_reducer';
import state from './state_reducer';

const rootReducer = combineReducers({
	user,
	admin,
	state
});

export default rootReducer;
