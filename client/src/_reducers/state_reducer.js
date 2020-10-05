import {
	GET_STATE
} from '../_actions/types';


export default function (state = {}, action) {
	switch (action.type) {
	case GET_STATE:
		return { ...state, state: action.payload };
	default:
		return state;
	}
}
