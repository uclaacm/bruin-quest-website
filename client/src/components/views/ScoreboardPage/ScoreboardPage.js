import React, { useEffect, useState } from 'react';
import './styles.css';
import Scoreboard from './Scoreboard';

async function getStandings() {
  // Mock data for now. This will be replaced with API call.
  return [
    { name: 'Team kookie', score: '5000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team kookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' },
    { name: 'Team Bookie', score: '2000' }
  ];
}

async function getTeamScores(teamId) {
  // Mock data for now. This will be replaced with API call.
  return [
    { name: 'Puzzle 1', score: '50' },
    { name: 'Puzzle 1', score: '200' },
    { name: 'Puzzle 1', score: '200' },
    { name: 'Puzzle 1', score: '200' },
    { name: 'Puzzle 1', score: '20' },
    { name: 'Puzzle 1', score: '20' },
    { name: 'Puzzle 1', score: '50' },
    { name: 'Puzzle 1', score: '200' },
    { name: 'Puzzle 1', score: '200' },
    { name: 'Puzzle 1', score: '200' },
    { name: 'Puzzle 1', score: '20' },
    { name: 'Puzzle 1', score: '20' }
  ];
}

export default function ScoreboardPage(props) {
  const team = 'Team Kookie';
  const [scores, setScores] = useState([]);
  useEffect(async () => {
    try {
      setScores(await getTeamScores(team));
    } catch (err) {
      // Handle err here. Either ignore the error, or surface the error up to the user somehow.
    }
  }, [team]);

  const [standings, setStandings] = useState([]);
  useEffect(async () => {
    try {
      setStandings(await getStandings());
    } catch (err) {
      // Handle err here. Either ignore the error, or surface the error up to the user somehow.
    }
  }, []);

  return (
    <div className="scoreboard-main-container">
      <span className="title-text">Scoreboard</span>
      <div className="scoreboard-row-container">
        <Scoreboard scores={scores} title={team + ' Scores'} />
        <Scoreboard scores={standings} title="Standings" />
      </div>
    </div>
  );
}
