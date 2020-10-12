import {
	TEAMS_ADMIN,
	UPDATESTATE_ADMIN
} from '../_actions/types';

export default function (state = {}, action) {
	switch (action.type) {
	case TEAMS_ADMIN:
		return { ...state, teams: action.payload };
	case UPDATESTATE_ADMIN:
		return { ...state, updatedState: action.payload };
	default:
		return state;
	}
}
