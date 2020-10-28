import React, { useState } from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import * as Screens from '../../../constants/Screens';
import Text from '../../Text/Text';
import Button from '../../Button/Button';
import Error from '../../Error/Error';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

const staticWelcome = `Event description and welcome message: Lorem ipsum
dolor sit amet, consectetur adipiscing elit. Mauris faucibus finibus
mauris. Pellentesque tempor lacus sit amet consectetur malesuada.`;
const staticTitle = 'Welcome Traveler!';
const discordLink = 'https://discord.gg/rKwaCr';

export default function LandingPage(props) {
	const { state } = props.location;
	const [errorMessage, setErrorMessage] = useState(state != undefined && state.noAccess ?
		'Sign up / Sign in to begin your quest' :
		'');
	if (state != undefined && state.noAccess) {
		props.history.push({
			state: { noAccess: false }
		});
	}

	return (
		<main
			className={css`
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				padding: 16px;
				@media screen and (max-width: ${Screens.small}px) {
					flex-direction: column;
				}
			`}
		>

			<img
				className={css`
					max-height: 80vh;
					max-width: 35vw;
					padding: 16px;
					@media screen and (max-width: ${Screens.small}px) {
						width: 40vw;
					}
				`}
				src={logo}
				alt="Bruin Quest Logo"
			/>
			<div
				className={css`
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 45vw;
					padding-left: 16px;
					@media screen and (max-width: ${Screens.small}px) {
						padding-left: 0;
						text-align: center;
						width: 90vw;
					}
				`}
			>
				{errorMessage && <Error fontSize="1rem"> {errorMessage} </Error>}
				<Text
					className={css`
						font-size: 3.5rem;
						font-family: ${Fonts.Primary};
						font-weight: 600;
						font-color: ${Colors.Black};
						@media screen and (max-width: ${Screens.small}px) {
							font-size: 2.5rem;
						}
					`}
				>
					{staticTitle}
				</Text>
				<Text
					className={css`
						font-size: 1.5rem;
						font-family: ${Fonts.Primary};
					`}
				>
					{staticWelcome}
				</Text>
				<div
					className={css`
						display: flex;
						justify-content: flex-start;
						width: 100%;
						padding-top: 40px;
						@media screen and (max-width: ${Screens.small}px) {
							justify-content: center;
						}
						@media screen and (max-width: ${Screens.xsmall}px) {
							flex-direction: column;
							align-items: center;
						}
					`}
				>
					<Link
						to="/register"
						className={css`
							margin-right: 16px;
							@media screen and (max-width: ${Screens.xsmall}px) {
								margin-right: 0;
								margin-bottom: 16px;
							}
						`}
					>
						<Button color={Colors.MediumBlue} height="50px" width="150px">
							Begin Quest
						</Button>
					</Link>
					<Button
						color={Colors.Gray}
						height="50px"
						width="180px"
						onClick={() => window.open(discordLink, '_blank')}
					>
						Join the Discord
					</Button>
				</div>
			</div>
		</main>
	);
}
