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
const csv = require('fast-csv');
const fs = require('fs');
const { Puzzle } = require('./models/Puzzle');

let addedPuzzles = 0;
let totalPuzzles = 0;
fs.createReadStream(path.resolve(__dirname, 'config', 'puzzleSeed.csv'))
	.pipe(csv.parse({ headers: true }))
	.on('error', err => console.error(err))
	.on('data', async row => {
		const puzzleInstance = new Puzzle(row);
		try {
			await puzzleInstance.save();
			addedPuzzles++;
			console.log(`${addedPuzzles}/${totalPuzzles} ${puzzleInstance._id} has been added successfully`);
		} catch (err) {
			console.error(`Failed to add ${puzzleInstance.name}`, err.message);
		}
	})
	.on('end', rowCount => {
		totalPuzzles = rowCount;
	});


app.use(cors());

// to not get any deprecation warning or error
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/teams', require('./routes/teams'));

// use this to show the image you have in node js server to client (react js)
// https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	// All the javascript and css files will be read and served from this folder
	app.use(express.static('client/build'));

	// index.html for all page routes    html or routing and naviagtion
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server Listening on ${port}`);
});
