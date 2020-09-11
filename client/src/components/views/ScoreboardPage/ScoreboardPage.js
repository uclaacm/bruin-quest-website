import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';
import Scoreboard from './Scoreboard';

async function getStandings() {
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

async function getTeamScores(teamId) {
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
	const [scores, setScores] = useState([]);
	useEffect(async () => {
		try {
			setScores(await getTeamScores(team));
		} catch (err) {
			// Handle err here. Either ignore the error, or surface the error up to the user somehow.
		}
	}, [team]);

	const [standings, setStandings] = useState([]);
	useEffect(async () => {
		try {
			setStandings(await getStandings());
		} catch (err) {
			// Handle err here. Either ignore the error, or surface the error up to the user somehow.
		}
	}, []);

	return (
		<div
			className={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
      `}
		>
			<Text
				className={css`
          text-align: center;
          font-size: 3.5rem;
          color: black;
          font-family: Poppins; 
        `}
			>
        Scoreboard
			</Text>
			<div
				className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: flex-start;
          height: 100vh;
          padding-top: 5vh;
          height: 100vh;
          width: 100vw;
        `}
			>
				<Scoreboard scores={scores} title={team + ' Scores'} />
				<Scoreboard scores={standings} title="Standings" />
			</div>
		</div>
	);
}
