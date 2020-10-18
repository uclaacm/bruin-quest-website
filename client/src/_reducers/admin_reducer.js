import {
	TEAMS_ADMIN,
	UPDATESTATE_ADMIN,
	SCORE_ADMIN,
	SUBMISSIONS_ADMIN
} from '../_actions/types';

export default function (state = {}, action) {
	switch (action.type) {
	case TEAMS_ADMIN:
		return { ...state, teams: action.payload };
	case UPDATESTATE_ADMIN:
		return { ...state, updatedState: action.payload };
	case SCORE_ADMIN:
		return { ...state, updatedScore: action.payload };
	case SUBMISSIONS_ADMIN:
		return { ...state, submissions: action.payload };
	default:
		return state;
	}
}
