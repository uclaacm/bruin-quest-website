const express = require('express');
const router = express.Router();
const { State } = require('../models/State');

router.get('/', async (req, res) => {
	const state = await State.findOne().exec();
	if (state) {
		res.send(state);
	} else {
		res.status(500).send('No app state configured');
	}
});

module.exports = router;
