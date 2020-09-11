const express = require('express');
const router = express.Router();
const { Puzzle } = require('../models/Puzzle');

// const { auth } = require('../middleware/auth');

// router.get("/:id", auth, (req, res) => {
router.get('/:id', (req, res) => {
	Puzzle.findById(req.params.id, (err, puzzle) => {
		if (err) {
			res.status(500).json({ success: false });
		}
		delete puzzle.correctAnswer;
		// console.log(req.user._id);
		res.status(200).json(puzzle);
	});
});

module.exports = router;
