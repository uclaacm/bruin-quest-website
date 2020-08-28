import React from 'react';
import './styles.css';

function LandingPage() {
	const staticWelcome = 'Event description and welcome message: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus finibus mauris. Pellentesque tempor lacus sit amet consectetur malesuada.';
	const staticDiscord = 'Join us on Discord!';
	const discordLink = 'https://discord.gg/rKwaCr';
	return (
		<>
			<div className="main-container">
				<img className="image" src={require('./assets/logo.png')} />
				<div className="middle-container">
					<span className="middle-text">{staticWelcome}</span>
				</div>
				<div className="middle-container">
					<span className="middle-text">{staticDiscord}</span>
					<a className="middle-text" href={discordLink} target="_blank">
						{discordLink}
					</a>
				</div>
			</div>
		</>
	);
}

export default LandingPage;
