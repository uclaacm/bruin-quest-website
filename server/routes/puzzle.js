const express = require("express");
const router = express.Router();
const { Puzzle } = require("../models/Puzzle");

const { auth } = require("../middleware/auth");

router.get("/:id", auth, async (req, res) => {
	try {
		const puzzle = await Puzzle.findById(req.params.id);
		const teamAnswers = await Team.findById();
		console.log(req.team._id);
		res.status(200).json(puzzle);
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
});

module.exports = router;
