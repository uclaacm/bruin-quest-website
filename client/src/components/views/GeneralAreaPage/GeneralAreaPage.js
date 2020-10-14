import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Text from '../../Text/Text.js';
import './GeneralAreaPage.css';

async function getAreaData(id) {
	const result = {
		name: id,
		link: `/area/${id}`
	};
	await fetch(`/api/general-areas/${id}`)
		.then(res => res.json())
		.then(data => {
			result.puzzles = data.locations.map(loc => {
				return {
					name: loc.name,
					image: loc.image,
					link: `/puzzle/${loc.name}`,
					completed: '50%',
					id: loc.puzzleId
				};
			});
		})
		.catch(err => console.log(err));
	return result;
}

function Puzzle(props) {
	return (
		<Link className="card" to={props.link}>
			<Text>{props.name}</Text>
			<div className="progressBar">
				<div className="completed" style={{ width: props.completed }}></div>
			</div>
			<img src={props.image} alt={props.name}/>
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
				{areaData.puzzles.map(puzzle => <Puzzle
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
