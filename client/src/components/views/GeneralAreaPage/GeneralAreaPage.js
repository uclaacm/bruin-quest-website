import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import Text from '../../Text/Text.js';
import { PUZZLE_SERVER, GENERAL_AREA_SERVER } from '../../../components/Config';

function Puzzle(props) {
	return (
		<div className={css`
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 2rem;
			transition: transform 0.3s;
			&:hover {
				transform: scale(1.1);
			}
		`}>
			<Link to={props.link}>
				<Text>{props.name}</Text>
				<div className={css`
				    --progress-bar-width: 40%;
					--progress-bar-height: .33rem;
					--progress-bar-complete-color: #298cff;
					--progress-bar-incomplete-color: #c4c4c4;
				
					background-color: var(--progress-bar-incomplete-color);
					border-radius: calc(var(--progress-bar-height) * .5);
					margin: 1rem auto;
					position: relative;
					width: var(--progress-bar-width);
					height: var(--progress-bar-height);
				`}>
					<div
						className={css`
							background-color: var(--progress-bar-complete-color);
							border-radius: inherit;
							height: 100%;
							width: ${props.completed};
							position: absolute;
							left: 0;
							top: 0;
						`}
						// style={{ width: props.completed }}
					></div>
				</div>
				<img
					src={props.image}
					alt={props.name}
					className={css`
						max-width: 250px;
						border-radius: 16px;
					`}
				/>
			</Link>
		</div>
	);
}

function GeneralAreaPage(props) {
	const [areaData, setAreaData] = useState();
	const [errorMessage, setErrorMessage] = useState('');

	async function getAreaData(id) {
		const res = await fetch(`${GENERAL_AREA_SERVER}/${id}`);
		const generalAreaData = await res.json();
		const puzzles = await Promise.all(
			generalAreaData.locations.map(async loc => {
				try {
					const { numberOfSolves } = await (
						await fetch(`${PUZZLE_SERVER}/${loc.puzzleId}`)
					).json();
					return {
						name: loc.name,
						image: loc.image,
						link: `/puzzle/${loc.puzzleId}`,
						completed: `${
							numberOfSolves / generalAreaData.numTeams > 1 ?
								100 :
								(numberOfSolves / generalAreaData.numTeams) * 100
						}%`,
						id: loc.puzzleId
					};
				} catch (err) {
					setErrorMessage('Could not load puzzles');
					return {};
				}
			})
		);
		return { name: generalAreaData.displayName, puzzles };
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await getAreaData(props.match.params.id);
				if (data) {
					setAreaData(data);
				}
			} catch {
				setErrorMessage('Area information could not be loaded');
			}
		}
		fetchData();
	}, [props.match.params.id]);

	return (
		<div className="general-area-container" style={{
			height: '100%',
			padding: '32px 16px',
			textAlign: 'center'
		}}>
			{errorMessage && <Text error>{errorMessage}</Text>}
			{areaData && areaData.name && areaData.puzzles ?
				<>
					<Text size="36px">{areaData.name}</Text>
					<div className={css`
					    display: flex;
						justify-content: center;
						flex-wrap: wrap;
					`}>
						{areaData.puzzles.map(puzzle =>
							<Puzzle
								link={puzzle.link}
								image={`/images/general-area/${puzzle.image}`}
								name={puzzle.name}
								completed={puzzle.completed}
								key={puzzle.id}
							/>)}
					</div>{' '}
				</>			 :
				<Text>Loading...</Text>
			}
		</div>
	);
}

export default GeneralAreaPage;
