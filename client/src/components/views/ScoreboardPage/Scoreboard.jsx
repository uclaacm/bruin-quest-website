import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';
import TableRow from './TableRow';

function renderTableRow(score) {
	return (
		<TableRow name={score.name} score={score.score}/>
	);
}

export default function Scoreboard(props) {
	return (
		<div
			className={css`
        display: flex;
        flex-direction: column;
      `}
		>
			<Text
				className={css`
          text-align: center;
          font-size: 2.5rem;
          color: black;
          font-family: Poppins;
        `}
			>
				{props.title}
			</Text>
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
