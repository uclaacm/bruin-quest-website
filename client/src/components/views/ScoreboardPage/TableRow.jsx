import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Text from '../../Text/Text';

const textStyle = css`
  text-align: center;
  font-size: 2rem;
  color: black;
  font-family: Poppins;
`;

export default function TableRow(props) {
	return (
		<tr>
			<td className={css`
        border: 7px solid #005587;
      `}>
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
					<Text className={textStyle}>
						{props.name}
					</Text>
					<Text className={textStyle}>
						{props.score}
					</Text>
				</div>
			</td>
		</tr>
	);
}

TableRow.propTypes = {
	name: PropTypes.string.isRequired,
	score: PropTypes.string.isRequired
};
