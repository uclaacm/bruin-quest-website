import React, { useState } from 'react';
import './styles.css';
import Scoreboard from './Scoreboard';

function getStandings() {
	// Mock data for now. This will be replaced with API call.
	return [
		{ name: 'Team kookie', score: '5000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team kookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' },
		{ name: 'Team Bookie', score: '2000' }
	];
}

function getTeamScores(teamId) {
	// Mock data for now. This will be replaced with API call.
	return [
		{ name: 'Puzzle 1', score: '50' },
		{ name: 'Puzzle 1', score: '200' },
		{ name: 'Puzzle 1', score: '200' },
		{ name: 'Puzzle 1', score: '200' },
		{ name: 'Puzzle 1', score: '20' },
		{ name: 'Puzzle 1', score: '20' },
		{ name: 'Puzzle 1', score: '50' },
		{ name: 'Puzzle 1', score: '200' },
		{ name: 'Puzzle 1', score: '200' },
		{ name: 'Puzzle 1', score: '200' },
		{ name: 'Puzzle 1', score: '20' },
		{ name: 'Puzzle 1', score: '20' }
	];
}

export default function ScoreboardPage(props) {
	const team = 'Team Kookie';
	const [scores, setScores] = useState(getTeamScores(team));
	const [standings, setStandings] = useState(getStandings());

	return (
		<div className="scoreboard-main-container">
			<span className="title-text">Scoreboard</span>
			<div className="scoreboard-row-container">
				<Scoreboard scores={scores} title={team + ' Scores'} />
				<Scoreboard scores={standings} title="Standings" />
			</div>
		</div>
	);
}
