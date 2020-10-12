const mongoose = require('mongoose');

const puzzleSchema = mongoose.Schema({
	_id: String,
	displayName: String,
	location: String,
	generalAreaId: String,
	generalAreaDisplayName: String,
	description: String,
	correctAnswer: String,
	link: String,
	type: {
		type: String,
		enum: ['gold', 'blue']
	},
	difficulty: {
		type: String,
		enum: ['lower div', 'upper div', 'super senior']
	},
	numberOfSolves: {
		type: Number,
		default: 0
	}
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema, 'Puzzle');

module.exports = { Puzzle };
