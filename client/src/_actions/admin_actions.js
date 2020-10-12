import axios from 'axios';
import {
	TEAMS_ADMIN,
	UPDATESTATE_ADMIN
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
