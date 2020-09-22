const mongoose = require('mongoose');

const puzzleSchema = mongoose.Schema({
	_id: String,
	displayName: String,
	location: String,
	generalArea: String,
	description: String,
	correctAnswer: String,
	link: String,
	difficulty: {
		type: String,
		enum: ['lower div', 'upper div', 'super senior']
	},
	hints: [String],
	numberOfSolves: {
		type: Number,
		default: 0
	}
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema, 'Puzzle');

module.exports = { Puzzle };
