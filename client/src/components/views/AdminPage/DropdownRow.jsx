import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import Text from '../../Text/Text';
import triangle from './assets/triangle.png';

export default function DropdownRow(props) {
	function changeSelection(event, item) {
		props.changeSelection(event, item);
	}

	return (
		<div
			className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 2px solid ${Colors.Black};
        width: 80vw;
        &:hover {
          cursor: pointer;
        }
      `}
			onClick={event => changeSelection(event, props.item)}
		>
			<Text size="2rem">
				{props.item.name}
			</Text>
			{props.showTriangle ? <img className={css`height: 3rem`} src={triangle}/> : null}
		</div>
	);
}
