'use strict';

const mongoose = require('mongoose');
const { State } = require('./models/State');
const config = require('./config/key');

process.on('unhandledRejection', err => process.nextTick(() => { throw err; }));

async function main() {
	await mongoose.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
	console.log('MongoDB Connected...');

	await State.create({ state: 'before' });
	console.log('State created correctly!');
	process.exit(0);
}

main();
