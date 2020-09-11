const { Team } = require('../models/Team');

const auth = (req, res, next) => {
	const token = req.cookies.w_auth;

	Team.findByToken(token, (err, user) => {
		if (err) {
			throw err;
		}
		if (!user) {
			return res.json({
				isAuth: false,
				error: true
			});
		}

		req.token = token;
		req.user = user;
		next();
		return undefined;
	});
};

module.exports = { auth };
