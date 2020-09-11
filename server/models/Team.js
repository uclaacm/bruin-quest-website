const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const teamSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String
	},
	tokenExp: {
		type: Number
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
	puzzles: {
		id: {
			name: String,
			submission: String,
			score: {
				type: Number,
				default: 0
			},
			status: {
				type: String,
				enum: ['correct', 'incorrect', 'pending', 'no attempt'],
				default: 'no attempt'
			}
		}
	}
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
	const token = jwt.sign(team._id.toHexString(), 'secret');
	const oneHour = moment().add(1, 'hour').valueOf();

	team.tokenExp = oneHour;
	team.token = token;
	return team.save();
};

teamSchema.statics.findByToken = async function (token) {
	const team = this;
	const decode = await jwt.verify(token, 'secret');
	return team.findOne({ _id: decode, token });
};

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };
