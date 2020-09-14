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
			status:
					{
						type: String,
						enum: ['correct', 'incorrect', 'pending', 'no attempt'],
						default: 'no attempt'
					}
		}
	}
});

teamSchema.pre('save', function (next) {
	const team = this;

	if (team.isModified('password')) {
		// console.log('password changed')
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				return next(err);
			}

			bcrypt.hash(team.password, salt, (err, hash) => {
				if (err) {
					return next(err);
				}
				team.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

teamSchema.methods.comparePassword = function (plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

teamSchema.methods.generateToken = function (cb) {
	const team = this;
	console.log('team', team);
	console.log('teamSchema', teamSchema);
	const token = jwt.sign(team._id.toHexString(), 'secret');
	const oneHour = moment().add(1, 'hour').valueOf();

	team.tokenExp = oneHour;
	team.token = token;
	team.save((err, team) => {
		if (err) {
			return cb(err);
		}
		cb(null, team);
	});
};

teamSchema.statics.findByToken = function (token, cb) {
	const team = this;

	jwt.verify(token, 'secret', (_err, decode) => {
		team.findOne({ _id: decode, token }, (err, team) => {
			if (err) {
				return cb(err);
			}
			cb(null, team);
		});
	});
};

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };
