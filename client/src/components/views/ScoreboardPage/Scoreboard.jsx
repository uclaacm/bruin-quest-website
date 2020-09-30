import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Fonts from '../../../constants/Fonts';
import TableRow from './TableRow';

export default function Scoreboard(props) {
	return (
		<div
			className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        width: 42vw;
        padding-top: 30px;
        padding-bottom: 80px;
      `}
		>
			<Text
				className={css`
          text-align: center;
          font-size: 3rem;
          font-family: ${Fonts.Primary};
          font-weight: 800;
          padding-bottom: 40px;
        `}
			>
				{props.title}
			</Text>
			<table className={css`border-collapse: collapse; width: 35vw;`}>
				{props.scores.map(score => <TableRow key={score.name} name={score.name} score={score.score}/>)}
			</table>
		</div>
	);
}

Scoreboard.propTypes = {
	title: PropTypes.string.isRequired,
	scores: PropTypes.array.isRequired
};
