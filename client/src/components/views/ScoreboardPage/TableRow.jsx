import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';

const textStyle = css`
  text-align: center;
  font-size: 2rem;
  font-family: ${Fonts.Primary};
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
          width: 35vw;
          height: 4vw;
          padding-left: 2vw;
          padding-right: 2vw;
        `}
			>
				<td>
					<Text className={textStyle}>
						{props.name}
					</Text>
				</td>
				<td>
					<Text className={textStyle}>
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
