const { Team } = require('../models/Team');

const auth = (req, res, next) => {
	const token = req.cookies.w_auth;

	Team.findByToken(token, (err, team) => {
		if (err) {
			throw err;
		}
		if (!team) {
			return res.json({
				isAuth: false,
				error: true
			});
		}

		req.token = token;
		req.team = team;
		next();
		return undefined;
	});
};

module.exports = { auth };
