import axios from 'axios';
import {
	GET_STATE
} from './types';
import { STATE_SERVER } from '../components/Config.js';

export function getAppState() {
	const request = axios.get(`${STATE_SERVER}/`)
		.then(response => response.data);

	return {
		type: GET_STATE,
		payload: request
	};
}
