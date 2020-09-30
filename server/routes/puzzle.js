const express = require("express");
const router = express.Router();
const { Puzzle } = require("../models/Puzzle");
const { Team } = require("../models/Team");

const { auth } = require("../middleware/auth");

router.get("/:id", auth, async (req, res) => {
	try {
		const puzzle = await Puzzle.findById(req.params.id);
		const teamAnswers = await Team.findById(req.team._id, "puzzles");
		delete puzzle.correctAnswer;
		const teamAnswer = teamAnswers.filter(
			(teamAnswer) => teamAnswer.id === req.params.id
		);
		console.log({ ...puzzle, ...teamAnswer });
		res.status(200).json({ ...puzzle, ...teamAnswer });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
});

module.exports = router;
