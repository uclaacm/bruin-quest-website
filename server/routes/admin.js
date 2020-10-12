const express = require('express');
const router = express.Router();
const { State } = require('../models/State');
const { Team } = require('../models/Team');

router.get('/teams', async (req, res) => {
	try {
		const teamsFound = await Team.find().exec();
		const teams = [];
		function cleanTeam(item) {
			const copyTeam = JSON.parse(JSON.stringify(item));
			delete copyTeam.password;
			teams.push(copyTeam);
		}

		teamsFound.forEach(cleanTeam);
		res.status(200).json({ teams });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/update', (req, res) => {
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

module.exports = router;
