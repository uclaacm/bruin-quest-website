import React from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';

export default function PlayerRow(props) {
	return (
		<div
			className={css`
        display: flex;
        justify-content: space-between;
        width: 80vw;
        padding: 20px;
      `}
		>
			<Text size="1.5rem"> {props.item.name} </Text>
			<Text size="1.5rem"> {props.item.discord} </Text>
		</div>
	);
}
