const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		minglength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
});


userSchema.pre('save', function (next) {
	const user = this;

	if (user.isModified('password')) {
		// console.log('password changed')
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				return next(err);
			}

			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
				return undefined;
			});
			return undefined;
		});
	} else {
		next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
		return undefined;
	});
};

userSchema.methods.generateToken = function (cb) {
	const user = this;
	console.log('user', user);
	console.log('userSchema', userSchema);
	const token = jwt.sign(user._id.toHexString(), 'secret');
	const oneHour = moment().add(1, 'hour').valueOf();

	user.tokenExp = oneHour;
	user.token = token;
	user.save((err, user) => {
		if (err) {
			return cb(err);
		}
		cb(null, user);
		return undefined;
	});
};

userSchema.statics.findByToken = function (token, cb) {
	const user = this;
	jwt.verify(token, 'secret', (_err, decode) => {
		user.findOne({ _id: decode, token }, (err, user) => {
			if (err) {
				return cb(err);
			}
			cb(null, user);
			return undefined;
		});
		return undefined;
	});
};

const User = mongoose.model('User', userSchema);

module.exports = { User };