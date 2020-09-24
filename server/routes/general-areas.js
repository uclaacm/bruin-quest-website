const express = require('express');
const router = express.Router();
const { GeneralArea } = require('../models/GeneralArea');

router.get('/', (req, res) => {
	GeneralArea.findOne({ name: req.query.name })
		.then(area => {
			if (area) {
				res.send(area);
			} else {
				res.status(404).send('Genearl area name not found');
			}
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;
