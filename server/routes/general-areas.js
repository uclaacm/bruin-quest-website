const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();
const { GeneralArea } = require('../models/GeneralArea');

router.get('/:name', (req, res) => {
	GeneralArea.findOne({ name: sanitize(req.params).name }).exec()
		.then(area => {
			if (area) {
				res.send(area);
			} else {
				res.status(404).json({ error: 'General area name not found' });
			}
		})
		.catch(err => {
			res.status(502).json({ error: err.message });
		});
});

module.exports = router;
