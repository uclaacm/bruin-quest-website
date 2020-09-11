const express = require('express');
const router = express.Router();
const { Team } = require('../models/Team');

const { auth } = require('../middleware/auth');

// =================================
//             Team
// =================================

router.get('/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.team._id,
		isAdmin: req.team.role !== 0,
		isAuth: true
	});
});

router.post('/register', (req, res) => {
	const team = new Team({ name: req.body.email, password: req.body.password });
	console.log(req.body);

	team.save((err, doc) => {
		if (err) {
			return res.json({ success: false, err });
		}
		console.log(`Created team ${doc.name}`);
		return res.status(200).json({
			success: true
		});
	});
});

router.post('/login', (req, res) => {
	Team.findOne({ name: req.body.name }, (_err, team) => {
		if (!team) {
			return res.json({
				loginSuccess: false,
				message: 'Auth failed, email not found'
			});
		}

		team.comparePassword(req.body.password, (_err, isMatch) => {
			if (!isMatch) {
				return res.json({ loginSuccess: false, message: 'Wrong password' });
			}

			team.generateToken((err, team) => {
				if (err) {
					return res.status(400).send(err);
				}
				res.cookie('w_authExp', team.tokenExp);
				res.cookie('w_auth', team.token).status(200).json({
					loginSuccess: true,
					teamId: team._id
				});
				return undefined;
			});
			return undefined;
		});
		return undefined;
	});
});

router.get('/logout', auth, (req, res) => {
	Team.findOneAndUpdate(
		{ _id: req.team._id },
		{ token: '', tokenExp: '' },
		(err, doc) => {
			if (err) {
				return res.json({ success: false, err });
			}
			console.log(`Logged out ${doc.name}`);
			return res.status(200).send({
				success: true
			});
		}
	);
});

module.exports = router;
