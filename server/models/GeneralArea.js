'use strict';
const mongoose = require('mongoose');

const generalAreaSchema = mongoose.Schema({
	_id: String,
	displayName: String,
	locations: [
		{
			name: String,
			image: String,
			puzzleId: String
		}
	]
});

const GeneralArea = mongoose.model('GeneralArea', generalAreaSchema, 'GeneralArea');

module.exports = { GeneralArea };
