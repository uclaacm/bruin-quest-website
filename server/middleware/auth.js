const { Team } = require('../models/Team');

const auth = async (req, res, next) => {
	const token = req.cookies.w_auth;
	try {
		const team = await Team.findByToken(token);
		if (!team) {
			return res.status(500).json({
				isAuth: false,
				error: 'Team not found'
			});
		}
		req.token = token;
		req.team = team.toObject();
		return next();
	} catch (error) {
		return res.status(500).json({
			isAuth: false,
			error
		});
	}
};

module.exports = { auth };
