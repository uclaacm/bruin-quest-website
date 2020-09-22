'use strict';
const express = require('express');
const router = express.Router();
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
		isAdmin: req.team.role !== 0,
		isAuth: true
	});
});

router.post('/register', async (req, res) => {
	try {
		const allPuzzles = await Puzzle.find({}, '_id');
		var puzzles = [];
		allPuzzles.forEach(id => puzzles.push(new PuzzleSubmission({ _id: id._id })));

		const team = new Team({
			name: req.body.email,
			password: req.body.password,
			puzzles: puzzles
		});

		const doc = await team.save();
		console.log(`Created team ${doc.name}`);

		return res.status(200).json({
			success: true
		});
	} catch (err) {
		return res.status(500).json({ success: false, err });
	}
});

router.post('/login', async (req, res) => {
	try {
		const team = await Team.findOne({ name: req.body.name });
		if (!team) {
			return res.status(500).json({
				loginSuccess: false,
				message: 'Auth failed, email not found'
			});
		}
		const isMatch = await team.comparePassword(req.body.password);
		if (!isMatch) {
			return res
				.status(500)
				.json({ loginSuccess: false, message: 'Wrong password' });
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
		return res.status(500).send(err);
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
}

router.post('/submitPuzzle/:puzzleId', auth, async (req, res) => {
	try {
		const puzzleId = req.params.puzzleId;
		const submission = req.body.submission;

		var status = 'no attempt';
		if (submission == '')
			res.send('empty submission');
		else {
			const currentPuzzle = await Puzzle.findById(puzzleId);

			var points;
			if (currentPuzzle.type == 'blue') status = 'pending';
			else {
				if (submission == currentPuzzle.correctAnswer) {
					status = 'correct';
					points = pointValues[currentPuzzle.difficulty];
				}
				else status = 'incorrect';
			}

			const doc = await Team.findOneAndUpdate(
				{ _id: req.team._id, 'puzzles._id': puzzleId },
				{ $set: { 'puzzles.$.submission': submission, 'puzzles.$.status': status, 'puzzles.$.score': points } }
			);
		}
		return res.status(200).json({
			success: true,
			status: status
		});
	} catch (err) {
		return res.status(500).json({ success: false, err });
	}
});

module.exports = router;
