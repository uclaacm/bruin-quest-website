import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
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
	const [scores, setScores] = useState([]);
	useEffect(() => {
		async function initScores() {
			try {
				setScores(await getTeamScores(team));
			} catch (err) {
				// Handle err here. Either ignore the error, or surface the error up to the user somehow.
			}
		}
		initScores();
	}, [team]);

	const [standings, setStandings] = useState([]);
	useEffect(() => {
		async function initStandings() {
			try {
				setStandings(await getStandings());
			} catch (err) {
				// Handle err here. Either ignore the error, or surface the error up to the user somehow.
			}
		}
		initStandings();
	}, []);

	return (
		<div className={css`padding: 4vw`}>
			<Text
				className={css`
          text-align: left;
          font-size: 6rem;
          font-family: ${Fonts.Primary}; 
          font-weight: 600;
          font-color: ${Colors.Black};
          padding-bottom: 80px;
        `}
			>
        Scoreboard
			</Text>
			<div
				className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 40px;
        `}
			>
				<Scoreboard scores={scores} title={team + ' Scores'} />
				<Scoreboard scores={standings} title="Standings" />
			</div>
		</div>
	);
}
