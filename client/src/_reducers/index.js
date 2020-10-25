import { combineReducers } from 'redux';
import user from './user_reducer';
import admin from './admin_reducer';
import state from './state_reducer';
import scoreboard from './scoreboard_reducer';

const rootReducer = combineReducers({
	user,
	admin,
	state,
	scoreboard
});

export default rootReducer;
