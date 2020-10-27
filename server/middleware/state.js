const { State } = require('../models/State');
// The targeted endpoint logic will have to use this to get state and then decide on action
const checkState = (res, next) => {
	State.findOne()
		.then(state => {
			if (state) {
				res.state = state.toObject().state;
				return next();
			}
			return res.status(500).json({
				error: 'No app state configured'
			});
		})
		.catch(err => {
			return res.status(500).json({ success: false, err });
		});
};

module.exports = { checkState };
