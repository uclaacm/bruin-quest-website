const { Team } = require('../models/Team');

const auth = async (req, res, next) => {
	const token = req.cookies.w_auth;
	const team = await Team.findByToken(token);
	if (!team) {
		return res.status(500).json({
			isAuth: false,
			error: true
		});
	}
	req.token = token;
	req.team = team;
	return next();
};

module.exports = { auth };
