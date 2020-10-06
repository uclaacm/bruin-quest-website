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
				res.status(404).send('Genearl area name not found');
			}
		})
		.catch(err => {
			res.status(502).send(`Bad Gateway: ${err}`);
		});
});

module.exports = router;
