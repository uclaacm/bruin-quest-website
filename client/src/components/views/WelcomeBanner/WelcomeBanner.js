import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import Text from '../../Text/Text';
import bear from './assets/bear.svg';

function WelcomeBanner({
	width = '100vw',
	height = '290px',
	colorLeft = Colors.Purple,
	colorRight = Colors.GrapeFruit,
	textColor = Colors.White,
	textSize = '80px',
	textWeight = 'bold',
	topText = 'Login as',
	botText = 'team',
	...props
}) {
	return (
		<div
			className={css`
				width: ${width};
                height: ${height};
                background-image: linear-gradient(to right, ${colorLeft}, ${colorRight});
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            `}
			{...props}
		>
			<div
				className={css`
                        margin-left: 60px;
                        min-width: 450px;
			        `}
			>
				<Text
					color={textColor}
					size={textSize}
					weight={textWeight}
				>
					{topText}
				</Text>
				<Text
					color={textColor}
					size={textSize}
					weight={textWeight}
				>
					{botText}
				</Text>
			</div>

			<img
				className={css`
                        margin-right: 25px;
			        `}
				src={bear}
				alt=""
			/>

		</div>
	);
}

export default WelcomeBanner;
