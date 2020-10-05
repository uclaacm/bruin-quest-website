import axios from 'axios';
import {
	UPDATESTATE_ADMIN
} from './types';
import { ADMIN_SERVER } from '../components/Config.js';

export function updateAppState(dataToSubmit) {
	const request = axios.post(`${ADMIN_SERVER}/update`, dataToSubmit)
		.then(response => response.data);

	return {
		type: UPDATESTATE_ADMIN,
		payload: request
	};
}
