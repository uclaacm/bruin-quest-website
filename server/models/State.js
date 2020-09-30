
const mongoose = require('mongoose');

const appStateSchema = mongoose.Schema({
	state: String
});

const State = mongoose.model('State', appStateSchema);

module.exports = { State };
