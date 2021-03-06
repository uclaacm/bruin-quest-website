const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// parses information from a csv file and then load it into the mongoose database
const { populateDB } = require('./utils/dbUtils');
if (process.argv.length > 2 && process.argv[2] === '--populate') {
	populateDB();
}

app.use(cors());

// to not get any deprecation warning or error
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// to get json data
// support parsing of application/json type post data
app.use(express.json());
app.use(cookieParser());

app.use('/api/teams', require('./routes/teams'));
app.use('/api/general-areas', require('./routes/general-areas'));
app.use('/api/puzzle', require('./routes/puzzle'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/state', require('./routes/state'));
app.use('/api/scoreboard', require('./routes/scoreboard'));

// use this to show the image you have in node js server to client (react js)
// https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	// All the javascript and css files will be read and served from this folder
	app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

	// index.html for all page routes    html or routing and navigation
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server Listening on ${port}`);
});
