import React from 'react';
import { withRouter } from 'react-router-dom';
import { css } from 'emotion';

import Text from '../../Text/Text';
import InNOut from './assets/InNOut.jpg';
import MovieTheater from './assets/MovieTheater.jpg';
import DiddyRiese from './assets/DiddyRiese.png';
import SMBeach from './assets/SMBeach.jpeg';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import Button from '../../../components/Button/Button.js';

const classes = {
	page: css`
		padding: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	`,
	container: css`
		max-width: 700px;
	`,
	title: css`
		text-align: center;
		font-size: 3rem;
		font-family: ${Fonts.Primary};
		font-weight: 600;
		font-color: ${Colors.Black};
		padding-bottom: 16px;
	`,
	bodyText: css`
		text-align: center;
		font-family: ${Fonts.Primary};
		font-color: ${Colors.Black};
		font-size: 1.5rem;
	`,
	imageContainer: css`
		display: flex;
		justify-content: center;
		margin: 16px 0;
	`,
	locationImage: css`
		max-width: 80%;
		border-radius: 16px;
	`
};

const locations = [
	{
		name: 'In-N-Out at Westwood',
		image: InNOut
	},
	{
		name: 'Diddy Riese',
		image: DiddyRiese
	},
	{
		name: 'The Bruin Theater',
		image: MovieTheater
	},
	{
		name: 'Santa Monica Beach',
		image: SMBeach
	}
];

function RandomLocation() {
	const randomIndex = Math.floor(Math.random() * locations.length);
	return locations[randomIndex];
}

function LoginPage(props) {
	const location = RandomLocation();
	return (
		<div id='page' className={classes.page}>
			<div id='container' className={classes.container}>
				<Text
					className={classes.title}
				>
					Not Found
				</Text>
				<Text className={classes.bodyText}>
					It seems you are lost and found yourself at...
				</Text>
				<Text className={classes.bodyText}>
					<b>{location.name}</b>
				</Text>
				<div className={classes.imageContainer}>
					<img className={classes.locationImage} src={location.image} alt={location.name}/>
				</div>
				<Button
					style={{ margin: 'auto' }}
					onClick={() => {
						window.location.href = '/';
					}}
				>
					Back Home
				</Button>
			</div>
		</div>
	);
}

export default withRouter(LoginPage);
