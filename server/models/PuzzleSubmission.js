'use strict';
const mongoose = require('mongoose');

const puzzleSubmissionSchema = mongoose.Schema({
	_id: String,
	submission: {
		type: String,
		default: null
	},
	score: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		enum: ['correct', 'incorrect', 'pending', 'no attempt'],
		default: 'no attempt'
	}
})

const PuzzleSubmission = mongoose.model('PuzzleSubmission', puzzleSubmissionSchema);

module.exports = { PuzzleSubmission };

