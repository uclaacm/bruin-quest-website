import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import TableRow from './TableRow';

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
          font-family: ${Fonts.Primary};
        `}
			>
				{props.title}
			</Text>
			<table>
				{props.scores.map(score => <TableRow key={score.name} name={score.name} score={score.score}/>)}
			</table>
		</div>
	);
}

Scoreboard.propTypes = {
	title: PropTypes.string.isRequired,
	scores: PropTypes.array.isRequired
};
