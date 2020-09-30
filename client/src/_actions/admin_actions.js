import axios from 'axios';
import {
	UPDATESTATE_ADMIN,
	GET_STATE
} from './types';
import { ADMIN_SERVER, STATE_SERVER } from '../components/Config.js';

export function updateAppState(dataToSubmit) {
	const request = axios.post(`${ADMIN_SERVER}/update`, dataToSubmit)
		.then(response => response.data);

	return {
		type: UPDATESTATE_ADMIN,
		payload: request
	};
}

export function getAppState() {
	const request = axios.get(`${STATE_SERVER}/`)
		.then(response => response.data);

	return {
		type: GET_STATE,
		payload: request
	};
}
