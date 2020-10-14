const express = require('express');
const router = express.Router();
const { State } = require('../models/State');
const { Team } = require('../models/Team');
const { auth } = require('../middleware/auth');

router.get('/teams', auth, async (req, res) => {
	if (!req.team.isAdmin) {
		res.status(500).json({ error: 'Not admin' });
		return;
	}
	try {
		const teamsDoc = await Team.find().exec();
		const teams = [];
		function cleanTeam(team) {
			const copyTeam = JSON.parse(JSON.stringify(team));
			delete copyTeam.password;
			teams.push(copyTeam);
		}

		teamsDoc.forEach(cleanTeam);
		res.status(200).json({ teams });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/update', auth, (req, res) => {
	if (!req.team.isAdmin) {
		res.status(500).json({ error: 'Not admin' });
		return;
	}
	try {
		State.findOneAndUpdate({}, { $set: { state: req.body.state } }, { upsert: false }, err => {
			if (err) {
				throw err;
			}
		});
		return res.status(200).json({
			success: true,
			state: req.body.state
		});
	} catch (err) {
		return res.status(500).json({ success: false, err });
	}
});

router.get('/submissions', auth, async (req, res) => {
	if (!req.team.isAdmin) {
		res.status(500).json({ error: 'Not admin' });
		return;
	}
	try {
		const teamsDoc = await Team.find().exec();
		const submissions = {};
		function checkTeam(team) {
			team.puzzles.forEach(puzzle => {
				if (puzzle.status === 'pending' || puzzle.status === 'scored') {
					if (puzzle.name in submissions) {
						submissions[puzzle.name].push(
							{ teamId: team._id, puzzleId: puzzle._id,
								submission: puzzle.submission, score: puzzle.score }
						);
					} else {
						submissions[puzzle.name] = [
							{ teamId: team._id, puzzleId: puzzle._id,
								submission: puzzle.submission, score: puzzle.score }
						];
					}
				}
			});
		}

		teamsDoc.forEach(checkTeam);
		res.status(200).json({ submissions });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/score', auth, (req, res) => {
	if (!req.team.isAdmin) {
		res.status(500).json({ error: 'Not admin' });
		return;
	}
	try {
		Team.findOneAndUpdate({ _id: req.body.teamId, 'puzzles._id': req.body.puzzleId },
			{ $set: { 'puzzles.$.status': 'scored', 'puzzles.$.score': req.body.score } }, { upsert: false }, err => {
				if (err) {
					throw err;
				}
			});
		return res.status(200).json({
			teamId: req.body.teamId,
			puzzleId: req.body.puzzleId,
			score: req.body.score
		});
	} catch (err) {
		return res.status(500).json({ err });
	}
});

module.exports = router;
