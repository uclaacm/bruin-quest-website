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
		const allPuzzles = await Puzzle.find({}, '_id');
		const puzzles = [];
		allPuzzles.forEach(id =>
			puzzles.push(new PuzzleSubmission({ _id: id._id })));

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
		const teamWithToken = await team.generateToken();
		res.cookie('w_authExp', teamWithToken.tokenExp);
		res.cookie('w_auth', teamWithToken.token);
		console.log(`Logged in team ${teamWithToken.name}`);
		return res.status(200).json({
			loginSuccess: true,
			teamId: teamWithToken._id
		});
	} catch (err) {
		return res.status(500).json({ error: 'Unable to login' });
	}
});

router.get('/logout', auth, async (req, res) => {
	try {
		const doc = await Team.findOneAndUpdate(
			{ _id: req.team._id },
			{ token: '', tokenExp: '' }
		);
		console.log(`Logged out ${doc.name}`);
		return res.status(200).send({
			success: true
		});
	} catch (err) {
		return res.status(500).json({ success: false, err });
	}
});

const pointValues = {
	'lower div': 30,
	'upper div': 40,
	'super senior': 60
};

router.post('/submitPuzzle/:puzzleId', auth, async (req, res) => {
	try {
		const { puzzleId } = sanitize(req.params);
		const { submission } = sanitize(req.body);

		let status = 'no attempt';
		const currentPuzzle = await Puzzle.findById(puzzleId);

		let score = 0;
		if (currentPuzzle.type === 'gold') {
			status = 'pending';
		} else if (submission === currentPuzzle.correctAnswer) {
			status = 'correct';
			score = pointValues[currentPuzzle.difficulty];
		} else {
			status = 'incorrect';
		}

		const doc = await Team.findOneAndUpdate(
			{ _id: req.team._id, 'puzzles._id': puzzleId },
			{
				$set: {
					'puzzles.$.submission': submission,
					'puzzles.$.status': status,
					'puzzles.$.score': score
				}
			}
		);
		console.log(doc);
		return res.status(200).json({
			submission,
			status,
			score
		});
	} catch (err) {
		return res.status(500).json({ error: 'Unable to submit puzzle' });
	}
});

module.exports = router;
