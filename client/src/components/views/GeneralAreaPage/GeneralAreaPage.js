import React from 'react';

import './GeneralAreaPage.css';

function Location(props) {
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

function Puzzle(props) {
	return (
		<a className="card" href={props.link}>
			<h2>{props.name}</h2>
			<img src={props.image} alt={props.name}/>
		</a>
	);
}

function GeneralAreaPage() {
	return (
		<div className="app">
			<h1>The Hill</h1>
			<div className="cardList">
				<Location
					name="De Neve"
					image="https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg"
					completed="20%"
				/>
				<Location
					name="De Neve"
					image="https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg"
					completed="40%"
				/>
				<Location
					name="De Neve"
					image="https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg"
					completed="60%"
				/>
				<Location
					name="De Neve"
					image="https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg"
					completed="80%"
				/>
				<Location
					name="De Neve"
					image="https://wp.dailybruin.com/images/2018/11/web.news_.halltresspasser.file_1.jpg"
					completed="100%"
				/>
			</div>
		</div>
	);
}

export default GeneralAreaPage;
