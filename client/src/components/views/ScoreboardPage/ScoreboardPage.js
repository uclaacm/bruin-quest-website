import React, { Component } from 'react';
import './styles.css'
import Scoreboard from './Scoreboard'

export default class ScoreboardPage extends Component {
  constructor(props) {
    super(props);

    this.getStandings()
    this.getTeamScores()  
    this.team = "Team Kookie" // Will be replaced later by session info or something
  }

  getStandings() {
    // Mock data for now. This will be replaced with API call.
    this.standings = [
      { "name": "Team kookie", "score": "5000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team kookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
      { "name": "Team Bookie", "score": "2000" },
    ]
  }

  getTeamScores() {
    // Mock data for now. This will be replaced with API call.
    this.scores = [
      { "name": "Puzzle 1", "score": "50" },
      { "name": "Puzzle 1", "score": "200" },
      { "name": "Puzzle 1", "score": "200" },
      { "name": "Puzzle 1", "score": "200" },
      { "name": "Puzzle 1", "score": "20" },
      { "name": "Puzzle 1", "score": "20" },
      { "name": "Puzzle 1", "score": "50" },
      { "name": "Puzzle 1", "score": "200" },
      { "name": "Puzzle 1", "score": "200" },
      { "name": "Puzzle 1", "score": "200" },
      { "name": "Puzzle 1", "score": "20" },
      { "name": "Puzzle 1", "score": "20" },

    ]
  }

  render() {
    return (
      <div className="score-main-container">
        <span className="title-text">Scoreboard</span>
        <div className="score-row-container">
          <Scoreboard scores={this.scores} title={this.team + ' Scores'} />
          <Scoreboard scores={this.standings} title="Standings" />
        </div>
      </div>
    );
  }
}
