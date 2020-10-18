import axios from 'axios';
import {
	SCORES_SCOREBOARD,
	STANDINGS_SCOREBOARD
} from './types';
import { SCOREBOARD_SERVER } from '../components/Config.js';

export function teamScores(id) {
	const request = axios.get(`${SCOREBOARD_SERVER}/scores/${id}`)
		.then(response => response.data);

	return {
		type: SCORES_SCOREBOARD,
		payload: request
	};
}

export function teamStandings() {
	const request = axios.get(`${SCOREBOARD_SERVER}/standings`)
		.then(response => response.data);

	return {
		type: STANDINGS_SCOREBOARD,
		payload: request
	};
}
