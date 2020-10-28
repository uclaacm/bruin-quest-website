const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();
const { Team } = require('../models/Team');

const { auth } = require('../middleware/auth');

router.get('/scores/:id', auth, async (req, res) => {
	try {
		const teamId = sanitize(req.params.id);
		const teamAnswersDoc = await Team.findById(teamId, 'puzzles').exec();
		if (!teamAnswersDoc) {
			res.status(500).json({ error: 'Team scores could not be loaded' });
		}
		const teamAnswers = teamAnswersDoc.toObject();
		const scores = [];
		teamAnswers.puzzles.forEach(answer => {
			scores.push({ name: answer.name, score: answer.score });
		});
		res.status(200).json({ scores });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/standings', auth, async (req, res) => {
	try {
		const teamsDoc = await Team.find().exec();
		if (!teamsDoc) {
			res.status(500).json({ error: 'Standings could not be loaded' });
		}

		const standings = [];
		teamsDoc.forEach(team => {
			let score = 0;
			team.puzzles.forEach(puzzle => {
				score += puzzle.score;
			});
			standings.push({ name: team.name, score });
		});

		standings.sort((a, b) => {
			return b.score - a.score;
		});

		res.status(200).json({ standings });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
module.exports = router;
