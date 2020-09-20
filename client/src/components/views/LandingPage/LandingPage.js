import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import Text from '../../Text/Text';
import Button from '../../Button/Button';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

const staticWelcome = `Event description and welcome message: Lorem ipsum 
dolor sit amet, consectetur adipiscing elit. Mauris faucibus finibus 
mauris. Pellentesque tempor lacus sit amet consectetur malesuada.`;
const staticTitle = 'Welcome Traveler!';
const discordLink = 'https://discord.gg/rKwaCr';

export default function LandingPage() {
	return (
		<main
			className={css`
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 100vh;
      `}
		>
			<img className={css` height: 80vh`} src={logo} alt=""/>
			<div
				className={css`
          flex-direction: column;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 45vw;
        `}
			>
				<Text
					className={css`
            text-align: left;
            font-size: 7rem;
            font-family: ${Fonts.Primary}; 
            font-weight: 600;
            font-color: ${Colors.Black};
          `}
				>
					{staticTitle}
				</Text>
				<Text
					className={css`
            text-align: left;
            font-size: 2rem;
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
            padding-top: 50px;
          `}
				>
					<Link
						to="/register" className={css`padding-right: 30px;`}
					>
						<Button color={Colors.MediumBlue} height='50px' width='200px'>
            Begin Quest
						</Button>
					</Link>
					<Button
						color={Colors.Gray}
						height='50px'
						width='300px'
						onClick={() => window.open(discordLink, '_blank')}
					>
            Join the Discord
					</Button>
				</div>
			</div>
		</main>
	);
}
