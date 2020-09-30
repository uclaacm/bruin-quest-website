import React, { useState } from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import Button from '../../Button/Button';
import Text from '../../Text/Text';

export default function ControlRow(props) {
	return (
		<div
			className={css`
        display: flex;
        justify-content: space-between;
        width: 80vw;
        padding: 20px;
      `}
		>
			<Button onClick={() => props.onClick(props.item.name)}>{props.item.name}</Button>
			<Text size="1.5rem"> {props.item.description} </Text>
		</div>
	);
}
