import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';
import { css } from 'emotion';

import Text from '../../Text/Text';
import InNOut from './assets/InNOut.jpg';
import MovieTheater from './assets/MovieTheater.jpg';
import DiddyRiese from './assets/DiddyRiese.png';
import SMBeach from './assets/SMBeach.jpeg';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import Button from '../../../components/Button/Button.js';

const { Title } = Typography;

const classes = {
	page: css`
		padding: 2vw;
	`,
	title: css`
		text-align: left;
		font-size: 6rem;
		font-family: ${Fonts.Primary}; 
		font-weight: 600;
		font-color: ${Colors.Black};
		padding-bottom: 16px;
	`,
	bodyText: css`
		text-align: left;
		font-family: ${Fonts.Primary}; 
		font-color: ${Colors.Black};
		font-size: 2rem;
	`,
	bodyContainer: css`
		margin-bottom: 16px;
	`,
	imageContainer: css`
		display: flex;
		justify-content: center;
		margin-bottom: 16px;
	`,
	locationImage: css`
		width: 500px;
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
		<div className={classes.page}>
			<Text
				className={classes.title}
			>
        Not Found
			</Text>
			<Row className={classes.imageContainer}>
				<Col span={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
					<div className={classes.bodyContainer}>
						<Text className={classes.bodyText}>
							It seems you are lost and found yourself at...
						</Text>
					</div>
					<Text className={classes.bodyText}>
						<b>{location.name}</b>
					</Text>
				</Col>
				<Col span={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
					<img className={classes.locationImage} src={location.image}/>
				</Col>
			</Row>
			<Button onClick={() => {
				window.location.href = '/';
			}}>
				Back Home
			</Button>
		</div>
	);
}

export default withRouter(LoginPage);
