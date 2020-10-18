import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import * as Screens from '../../../constants/Screens';

const textStyle = css`
  text-align: center;
  font-size: 1.75vw;
  font-weight: 800;
  font-family: ${Fonts.Primary};
  @media screen and (max-width: ${Screens.medium}px) {
    font-size: 3.5vw;
  }
`;

const skinnyTextStyle = css`
  ${textStyle}
  font-weight: 200;
`;

export default function TableRow(props) {
	return (
		<tr
			className={css`
        border: 7px solid ${Colors.Blue};
      `}
		>
			<div
				className={css`
          flex-direction: row;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 37vw;
          height: 4vw;
          padding-left: 2vw;
          padding-right: 2vw;
          @media screen and (max-width: ${Screens.medium}px) {
            width: 82vw;
            height: 10vw;
          }
        `}
			>
				<td>
					<Text className={textStyle}>
						{props.name}
					</Text>
				</td>
				<td>
					<Text className={skinnyTextStyle}>
						{props.score}
					</Text>
				</td>
			</div>
		</tr>
	);
}

TableRow.propTypes = {
	name: PropTypes.string.isRequired,
	score: PropTypes.string.isRequired
};
