const express = require('express');
const router = express.Router();
const { State } = require('../models/State');

router.get('/', async (req, res) => {
	const state = await State.findOne().exec();
	if (state) {
		res.send(state);
	} else {
		res.json({ state: 'before' });
	}
});

module.exports = router;
