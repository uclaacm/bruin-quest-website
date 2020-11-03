const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();
const { GeneralArea } = require('../models/GeneralArea');
const { Team } = require('../models/Team');
const { auth } = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
	try {
		const generalAreaId = sanitize(req.params.id);
		const generalAreaDoc = await GeneralArea.findById(generalAreaId).exec();
		if (!generalAreaDoc) {
			res.status(500).json({ error: 'General Area not found' });
		}
		const numTeams = await Team.count().exec();
		if (!numTeams) {
			res.status(500).json({ error: 'Unable to get number of teams' });
		}
		const generalArea = generalAreaDoc.toObject();
		res.status(200).json({ ...generalArea, numTeams });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
