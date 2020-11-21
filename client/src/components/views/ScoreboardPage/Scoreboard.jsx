import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Fonts from '../../../constants/Fonts';
import * as Screens from '../../../constants/Screens';
import TableRow from './TableRow';

export default function Scoreboard(props) {
	return (
		<div
			className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        width: 44vw;
        padding-top: 30px;
        padding-bottom: 80px;
        @media screen and (max-width: ${Screens.medium}px) {
          width: 90vw;
          margin: 10px;
        }
      `}
		>
			<Text
				className={css`
          text-align: center;
          font-size: 2.25vw;
          font-family: ${Fonts.Primary};
          font-weight: 800;
          padding-bottom: 40px;
          @media screen and (max-width: ${Screens.medium}px) {
            font-size: 4vw;
          }
        `}
			>
				{props.title}
			</Text>
			<table className={css`border-collapse: collapse; width: 37vw;`}>
				{props.scores.map(score => <TableRow key={score.name} name={score.name} score={score.score} url={score.url}/>)}
			</table>
		</div>
	);
}

Scoreboard.propTypes = {
	title: PropTypes.string.isRequired,
	scores: PropTypes.array.isRequired
};
