import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import * as Screens from '../../../constants/Screens';
import Text from '../../Text/Text';
import Button from '../../Button/Button';
import BarMessage from '../../BarMessage/BarMessage';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const staticWelcome = `Get ready to explore the many hidden mysteries of UCLA
	and gain points for each challenge you solve. This competition only lasts
	from November 21st to November 22nd. To keep updated with the latest news,
	be sure to join our Discord. When you are ready to begin, sign in then go
	to the map or hit "Begin Quest". Happy adventures!`;
const staticTitle = 'Welcome Traveler!';
const discordLink = 'https://discord.gg/P9SjcFT6MF';

export default function LandingPage(props) {
	const { state } = props.location;
	let errorMessage = '';
	if (state != undefined && state.noAccess) {
		errorMessage = 'Sign up / Sign in to begin your quest';
	} else if (state != undefined && state.invalidState) {
		errorMessage = 'Bruin Quest is not currently live';
	}

	const user = useSelector(state => state.user);

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
				{errorMessage && <BarMessage fontSize="1rem"> {errorMessage} </BarMessage>}
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
						to={user.userData && !user.userData.isAuth ? '/register' : '/map'}
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
