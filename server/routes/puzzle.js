const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();
const { Puzzle } = require('../models/Puzzle');
const { Team } = require('../models/Team');

const { auth } = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
	try {
		const puzzleId = sanitize(req.params).id;
		const puzzleDoc = await Puzzle.findById(puzzleId).exec();
		if (!puzzleDoc) {
			return res.status(500).json({ error: 'Puzzle not found' });
		}
		const puzzle = puzzleDoc.toObject();
		const teamAnswersDoc = await Team.findById(req.team._id, 'puzzles').exec();
		if (!teamAnswersDoc) {
			return res.status(500).json({ error: 'Team answers not found' });
		}
		const teamAnswers = teamAnswersDoc.toObject();
		delete puzzle.correctAnswer;
		const teamAnswer = teamAnswers.puzzles.find(
			teamAnswer => teamAnswer._id === puzzleId
		);
		return res.status(200).json({ ...puzzle, ...teamAnswer });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;
