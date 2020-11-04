const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const uniqueValidator = require('mongoose-unique-validator');

const { PuzzleSubmission } = require('../models/PuzzleSubmission');


const SECRET = 'gobruins!owo';

const teamSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	members: [
		{
			name: {
				type: String,
				maxlength: 50
			},
			discord: {
				type: String,
				maxlength: 50
			}
		}
	],


	puzzles: [PuzzleSubmission.schema]

});

teamSchema.pre('save', async function (next) {
	const team = this;
	if (team.isModified('password')) {
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const hash = await bcrypt.hash(team.password, salt);
			team.password = hash;
		} catch (err) {
			return next(err);
		}
	}
	return next();
});

teamSchema.methods.comparePassword = function (plainPassword) {
	return bcrypt.compare(plainPassword, this.password);
};

teamSchema.methods.generateToken = function () {
	const team = this;
	const token = jwt.sign(team._id.toHexString(), SECRET);
	return token;
};

teamSchema.statics.findByToken = async function (token) {
	const Team = this;
	const decode = await jwt.verify(token, SECRET);
	return Team.findOne({ _id: decode });
};


teamSchema.plugin(uniqueValidator);
const Team = mongoose.model('Team', teamSchema, 'Team');


module.exports = { Team };

