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

router.post('/register', async (req, res) => {
	try {
		const team = new Team({
			name: req.body.email,
			password: req.body.password
		});
		const doc = await team.save();
		console.log(`Created team ${doc.name}`);
		return res.status(200).json({
			success: true
		});
	} catch (err) {
		return res.status(500).json({ success: false, err });
	}
});

router.post('/login', async (req, res) => {
	try {
		const team = await Team.findOne({ name: req.body.name });
		if (!team) {
			return res.status(500).json({
				loginSuccess: false,
				message: 'Auth failed, email not found'
			});
		}
		const isMatch = await team.comparePassword(req.body.password);
		if (!isMatch) {
			return res
				.status(500)
				.json({ loginSuccess: false, message: 'Wrong password' });
		}
		const teamWithToken = await team.generateToken();
		res.cookie('w_authExp', teamWithToken.tokenExp);
		res.cookie('w_auth', teamWithToken.token);
		console.log(`Logged in team ${teamWithToken.name}`);
		return res.status(200).json({
			loginSuccess: true,
			teamId: teamWithToken._id
		});
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.get('/logout', auth, async (req, res) => {
	try {
		const doc = await Team.findOneAndUpdate(
			{ _id: req.team._id },
			{ token: '', tokenExp: '' }
		);
		console.log(`Logged out ${doc.name}`);
		return res.status(200).send({
			success: true
		});
	} catch (err) {
		return res.status(500).json({ success: false, err });
	}
});

module.exports = router;
