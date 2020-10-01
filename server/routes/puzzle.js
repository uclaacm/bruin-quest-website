const express = require('express');
const router = express.Router();
const { Puzzle } = require('../models/Puzzle');
const { Team } = require('../models/Team');

const { auth } = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
	try {
		const puzzle = (await Puzzle.findById(req.params.id).exec()).toObject();
		const teamAnswers = (
			await Team.findById(req.team._id, 'puzzles').exec()
		).toObject();
		delete puzzle.correctAnswer;
		const teamAnswer = teamAnswers.puzzles.find(
			teamAnswer => teamAnswer._id === req.params.id
		);
		res.status(200).json({ ...puzzle, ...teamAnswer });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

module.exports = router;
