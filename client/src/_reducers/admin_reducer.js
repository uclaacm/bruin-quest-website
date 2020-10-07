import {
	UPDATESTATE_ADMIN
} from '../_actions/types';


export default function (state = {}, action) {
	switch (action.type) {
	case UPDATESTATE_ADMIN:
		return { ...state, updatedState: action.payload };
	default:
		return state;
	}
}
