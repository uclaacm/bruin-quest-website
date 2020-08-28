import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import TableRow from './TableRow';

function renderTableRow(score) {
	return (
		<tr>
			<td>
				<TableRow name={score.name} score={score.score}/>
			</td>
		</tr>
	);
}

export default function Scoreboard(props) {
	return (
		<div className="table-container">
			<span className="table-text">{props.title}</span>
			<table>
				{props.scores.map(renderTableRow)}
			</table>
		</div>
	);
}

Scoreboard.propTypes = {
	title: PropTypes.string.isRequired,
	scores: PropTypes.array.isRequired
};
