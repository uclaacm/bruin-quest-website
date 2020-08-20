import React from 'react'
import './styles.css'
import '../../../index.css'

function LandingPage() {
    var staticWelcome = "Event description and welcome message: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus finibus mauris. Pellentesque tempor lacus sit amet consectetur malesuada."
    var staticDiscord = "Join us on Discord!"
    var discordLink = "https://discord.gg/rKwaCr"
    return (
        <>
            <div className="app">
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
    )
}

export default LandingPage
