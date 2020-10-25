/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import * as Screens from '../../../constants/Screens';
import Scoreboard from './Scoreboard';
import { teamScores, teamStandings } from '../../../_actions/scoreboard_actions';
import { useDispatch } from 'react-redux';

export default function ScoreboardPage(props) {
	const dispatch = useDispatch();

	const team = window.localStorage.getItem('teamId');
	const name = window.localStorage.getItem('teamName');
	const [scores, setScores] = useState([]);
	useEffect(() => {
		function getTeamScores(teamId) {
			return dispatch(teamScores(teamId)).then(response => {
				return response.payload.scores.map(score => {
					return { name: score.name, score: score.score };
				});
			});
		}

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
		function getStandings() {
			return dispatch(teamStandings()).then(response => {
				return response.payload.standings.map(standing => {
					return { name: standing.name, score: standing.score };
				});
			});
		}

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
		<div className={css`padding: 3vw`}>
			<Text
				className={css`
          text-align: left;
          font-size: 5rem;
          font-family: ${Fonts.Primary}; 
          font-weight: 800;
          font-color: ${Colors.Black};
          padding-bottom: 80px;
          @media screen and (max-width: ${Screens.medium}px) {
            width: 80vw;
            font-size: 3rem;
            padding-bottom: 20px;
          }
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
          @media screen and (max-width: ${Screens.medium}px) {
            flex-direction: column;
            align-items: center;
          }
        `}
			>
				<Scoreboard scores={scores} title={name + ' Scores'} />
				<Scoreboard scores={standings} title="Standings" />
			</div>
		</div>
	);
}
