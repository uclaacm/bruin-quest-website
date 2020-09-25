
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const puzzleSchema = mongoose.Schema({
	_id: {
		type: String
	},
	name:
	{
		type: String,
		unique: true
	},
	location: String,
	generalArea: String,
	correctAnswer: String,
	link: String,
	description: String,
	difficulty: {
		type: String,
		enum: ['lower div', 'upper div', 'super senior']
	},
	numberOfSolves: {
		type: Number,
		default: 0
	}
});


puzzleSchema.plugin(uniqueValidator);
const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = { Puzzle };
