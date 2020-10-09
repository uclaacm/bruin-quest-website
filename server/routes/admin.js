const express = require('express');
const router = express.Router();
const { State } = require('../models/State');

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
