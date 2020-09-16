import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import Text from '../../Text/Text';
import triangle from './assets/triangle.png';

export default function DropdownRow(props) {
	return (
		<div
			className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 7px solid ${Colors.Blue};
        width: 80vw;
        &:hover {
          cursor: pointer;
        }
      `}
			onClick={event => props.changeSelection(event, props.item)}
		>
			<Text
				className={css`
          text-align: center;
          font-size: 2rem;
          font-family: ${Fonts.Primary}; 
        `}
			>
				{props.item.name}
			</Text>
			{props.showTriangle ? <img className={css`height: 3rem`} src={triangle}/> : null}
		</div>
	);
}
