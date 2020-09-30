import React, { useState, useEffect } from 'react';

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
		<a className="card" href={props.link}>
			<h2>{props.name}</h2>
			<div className="progressBar">
				<div className="completed" style={{ width: props.completed }}></div>
			</div>
			<img src={props.image} alt={props.name}/>
		</a>
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
			<h1>{areaData.name}</h1>
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
		<div>Loading</div>;
}

export default GeneralAreaPage;
