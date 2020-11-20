const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');
const { Team } = require('../models/Team');
const { PuzzleSubmission } = require('../models/PuzzleSubmission');
const { Puzzle } = require('../models/Puzzle');
const { auth } = require('../middleware/auth');

// =================================
//             Team
// =================================

router.get('/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.team._id,
		isAdmin: req.team.isAdmin,
		isAuth: true
	});
});

router.post('/register', async (req, res) => {
	try {
		const allPuzzles = await Puzzle.find({});
		const puzzles = [];
		allPuzzles.forEach(id => {
			puzzles.push(new PuzzleSubmission({ _id: id._id, displayName: id.displayName }));
		});

		const team = new Team({
			name: req.body.team,
			password: req.body.password,
			members: req.body.members,
			puzzles
		});

		const doc = await team.save();
		console.log(`Created team ${doc.name}`);

		return res.status(200).json({
			success: true
		});
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(500).json({ error: 'Invalid team name' });
		}
		return res.status(500).json({ error: 'Unable to register team' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const team = await Team.findOne({ name: req.body.team });
		console.log(team);
		if (!team) {
			return res.status(500).json({
				error: 'Team not found'
			});
		}
		const isMatch = await team.comparePassword(req.body.password);
		if (!isMatch) {
			return res.status(500).json({ error: 'Wrong password' });
		}
		const token = team.generateToken();
		res.cookie('w_auth', token);
		console.log(`Logged in team ${team.name}`);
		return res.status(200).json({
			loginSuccess: true,
			teamId: team._id
		});
	} catch (err) {
		return res.status(500).json({ error: 'Unable to login' });
	}
});

router.get('/logout', auth, (req, res) => {
	try {
		console.log(`Logging out ${req.team._id}`);
		res.clearCookie('w_auth');
		return res.status(200).send({
			success: true
		});
	} catch (err) {
		return res.status(500).json({ error: 'Logout failed' });
	}
});

const pointValues = {
	'Lower Div': 30,
	'Upper Div': 40,
	'Super Senior': 60
};

router.post('/submitPuzzle/:puzzleId', auth, async (req, res) => {
	/*
	This contains a race condition. If two team members submit a correct and incorrect answer to the same puzzle at the
	same time, the correct answer my be overwritten even though the user is notified that their answer is correct.
	*/
	try {
		const { puzzleId } = sanitize(req.params);
		const { submission } = sanitize(req.body);

		let status;
		const currentPuzzle = await Puzzle.findById(puzzleId);

		let score = 0;

		// Check if this team submitted this puzzle before
		const team = await Team.findOne({ _id: req.team._id, 'puzzles._id': puzzleId });
		const previousAttempt = team.puzzles.find(puzzle => puzzle._id === puzzleId);
		// If they already got it right return their correct solution. Gold puzzles will never be 'correct'.
		if (previousAttempt && previousAttempt.status === 'correct') {
			console.log(`${team.name} submitted a puzzle, but their previous submission was correct.`);
			return res.status(200).json({
				submission: previousAttempt.submission,
				status: previousAttempt.status,
				score: previousAttempt.score
			});
		}

		if (currentPuzzle.type === 'Gold') {
			console.log(`${team.name} submitted ${currentPuzzle.displayName}`);
			status = 'pending';
		} else if (submission.replace(/_/g, '').toUpperCase() ===
			currentPuzzle.correctAnswer.replace(/_/g, '').toUpperCase()) {
			console.log(`${team.name} submitted ${currentPuzzle.displayName} correctly!`);
			status = 'correct';
			score = pointValues[currentPuzzle.difficulty];
			await Puzzle.findOneAndUpdate(
				{ _id: puzzleId },
				{ $inc: { numberOfSolves: 1 } }
			);
		} else {
			console.log(`${team.name} submitted ${currentPuzzle.displayName}, but it was wrong!`);
			status = 'incorrect';
		}

		await Team.findOneAndUpdate(
			{ _id: req.team._id, 'puzzles._id': puzzleId },
			{
				$set: {
					'puzzles.$.submission': submission,
					'puzzles.$.status': status,
					'puzzles.$.score': score
				}
			}
		);
		return res.status(200).json({
			submission,
			status,
			score
		});
	} catch (err) {
		console.error(`Error during puzzle submission: ${err}`);
		return res.status(500).json({ error: 'Unable to submit puzzle' });
	}
});

module.exports = router;
