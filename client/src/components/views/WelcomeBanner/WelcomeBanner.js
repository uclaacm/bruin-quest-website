import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import Text from '../../Text/Text';
import bear from './assets/bear.svg';

function WelcomeBanner({
	width = '100vw',
	height = '290px',
	colorLeft = Colors.Purple,
	colorRight = Colors.Grapefruit,
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
				background-image: linear-gradient(
					to right,
					${colorLeft},
					${colorRight}
				);
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				@media (max-width: 1000px) {
					height: calc(2 * ${height});
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}
			`}
			{...props}
		>
			<div
				className={css`
					margin-left: 60px;
					min-width: 450px;
				`}
			>
				<Text color={textColor} size={textSize} weight={textWeight}>
					{topText}
				</Text>
				<Text color={textColor} size={textSize} weight={textWeight}>
					{botText}
				</Text>
			</div>

			<img
				className={css`
					margin-right: 25px;
					@media (max-width: 600px) {
						margin-right: 0px;
						padding-left: 50px;
						width:100%;
					}
				`}
				src={bear}
				alt=""
			/>
		</div>
	);
}

export default WelcomeBanner;
