const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
		enum: ['Gold', 'Blue']
	},
	difficulty: {
		type: String,
		enum: ['Lower Div', 'Upper Div', 'Super Senior']
	},
	numberOfSolves: {
		type: Number,
		default: 0
	}
});

puzzleSchema.plugin(uniqueValidator);
const Puzzle = mongoose.model('Puzzle', puzzleSchema, 'Puzzle');

module.exports = { Puzzle };
