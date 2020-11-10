const { State } = require('../models/State');
// The targeted endpoint logic will have to use this to get state and then decide on action
const checkState = (req, res, next) => {
	try {
		State.findOne()
			.then(state => {
				if (state) {
					res.state = state.toObject().state;
					return next();
				}
				return res.status(500).json({
					error: 'No app state configured'
				});
			});
	} catch (error) {
		return res.status(500).json({ message: 'App state not configured', error });
	}
};

module.exports = { checkState };
