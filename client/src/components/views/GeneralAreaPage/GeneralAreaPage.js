import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Text from '../../Text/Text.js';
import './GeneralAreaPage.css';
import { PUZZLE_SERVER, GENERAL_AREA_SERVER } from '../../../components/Config';

async function getAreaData(id) {
	try {
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
					console.log(err);
					return {};
				}
			})
		);
		return { name: generalAreaData.displayName, puzzles };
	} catch (err) {
		console.log(err);
		return {};
	}
}

function Puzzle(props) {
	return (
		<Link className="card" to={props.link}>
			<Text>{props.name}</Text>
			<div className="progressBar">
				<div className="completed" style={{ width: props.completed }}></div>
			</div>
			<img src={props.image} alt={props.name} />
		</Link>
	);
}

function GeneralAreaPage(props) {
	const [areaData, setAreaData] = useState();
	useEffect(() => {
		async function fetchData() {
			setAreaData(await getAreaData(props.match.params.id));
		}
		fetchData();
	}, [props.match.params.id]);

	return areaData && areaData.name && areaData.puzzles ?
		<div className="app">
			<Text size="36px">{areaData.name}</Text>
			<div className="cardList">
				{areaData.puzzles.map(puzzle =>
					<Puzzle
						link={puzzle.link}
						image={puzzle.image}
						name={puzzle.name}
						completed={puzzle.completed}
						key={puzzle.id}
					/>)}
			</div>
		</div>	 :
		<Text>Loading...</Text>;
}

export default GeneralAreaPage;
