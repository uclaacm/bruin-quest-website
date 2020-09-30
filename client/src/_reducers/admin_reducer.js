import {
	UPDATESTATE_ADMIN,
	GET_STATE
} from '../_actions/types';


export default function (state = {}, action) {
	switch (action.type) {
	case UPDATESTATE_ADMIN:
		return { ...state, updatedState: action.payload };
	case GET_STATE:
		return { ...state, state: action.payload };
	default:
		return state;
	}
}
