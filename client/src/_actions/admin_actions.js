import axios from 'axios';
import {
	TEAMS_ADMIN,
	UPDATESTATE_ADMIN,
	SUBMISSIONS_ADMIN,
	SCORE_ADMIN
} from './types';
import { ADMIN_SERVER } from '../components/Config.js';

export function teams() {
	const request = axios.get(`${ADMIN_SERVER}/teams`)
		.then(response => response.data);

	return {
		type: TEAMS_ADMIN,
		payload: request
	};
}

export function updateAppState(dataToSubmit) {
	const request = axios.post(`${ADMIN_SERVER}/update`, dataToSubmit)
		.then(response => response.data);

	return {
		type: UPDATESTATE_ADMIN,
		payload: request
	};
}

export function submissions() {
	const request = axios.get(`${ADMIN_SERVER}/submissions`)
		.then(response => response.data);

	return {
		type: SUBMISSIONS_ADMIN,
		payload: request
	};
}

export function submitScore(dataToSubmit) {
	const request = axios.post(`${ADMIN_SERVER}/score`, dataToSubmit)
		.then(response => response.data);

	return {
		type: SCORE_ADMIN,
		payload: request
	};
}
