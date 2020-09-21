import React from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import * as Fonts from '../../../constants/Fonts';
import Text from '../../Text/Text';
import logo from './assets/logo.png';

const staticWelcome = `Event description and welcome message: Lorem ipsum 
dolor sit amet, consectetur adipiscing elit. Mauris faucibus finibus 
mauris. Pellentesque tempor lacus sit amet consectetur malesuada.`;
const staticDiscord = 'Join us on Discord!';
const discordLink = 'https://discord.gg/rKwaCr';

const textStyle = css`
  text-align: center;
  font-size: 2.5rem;
  font-family: ${Fonts.Primary}; 
`;

const middleContainer = css`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
`;

export default function LandingPage() {
	return (
		<main
			className={css`
        flex-direction: column;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 100vh;
      `}
		>
			<img className={css` width: 40vw`} src={logo} alt=""/>
			<div className={middleContainer}>
				<Text className={textStyle}>
					{staticWelcome}
				</Text>
			</div>
			<div className={middleContainer}>
				<Text className={textStyle}>
					{staticDiscord}
				</Text>
				<a
					className={css`
            color: ${Colors.Blue};
            font-size: 2rem;
            text-decoration: underline;
          `}
					href={discordLink}
					rel="noopener noreferrer"
					target="_blank">
					{discordLink}
				</a>
			</div>
		</main>
	);
}
