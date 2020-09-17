import React, { useState, useEffect } from 'react';

import './GeneralAreaPage.css';

function getAreaData(id) {
	return {
		name: id,
		link: '/',
		puzzles: [
			{
				name: 'De Neve',
				image: 'https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg',
				link: '/',
				completed: '20%'
			},
			{
				name: 'De Neve',
				image: 'https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg',
				link: '/',
				completed: '40%'
			},
			{
				name: 'De Neve',
				image: 'https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg',
				link: '/',
				completed: '60%'
			},
			{
				name: 'De Neve',
				image: 'https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg',
				link: '/',
				completed: '80%'
			},
			{
				name: 'De Neve',
				image: 'https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg',
				link: '/',
				completed: '100%'
			}
		]
	};
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
	const [areaData, setPuzzleData] = useState();
	useEffect(() => {
		async function fetchData() {
			setPuzzleData(await getAreaData(props.match.params.id));
		}
		fetchData();
	}, [props.match.params.id]);

	return areaData && areaData.name && areaData.puzzles ?
	(
		<div className="app">
			<h1>{areaData.name}</h1>
			<div className="cardList">
				{areaData.puzzles.map(puzzle => <Puzzle
					link={puzzle.link}
					image={puzzle.image}
					name={puzzle.name}
					completed={puzzle.completed}
				/>)}
			</div>
		</div>
	) : 
	<div>Loading</div>;
}

export default GeneralAreaPage;
