import {
	SCORES_SCOREBOARD,
	STANDINGS_SCOREBOARD
} from '../_actions/types';

export default function (state = {}, action) {
	switch (action.type) {
	case SCORES_SCOREBOARD:
		return { ...state, scores: action.payload };
	case STANDINGS_SCOREBOARD:
		return { ...state, standings: action.payload };
	default:
		return state;
	}
}
