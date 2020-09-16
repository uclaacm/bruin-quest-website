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

//parses information from a exel file and then load it into the mongoose database
const xlsx = require('node-xlsx')
const sampleData = xlsx.parse('./config/sampleData.xlsx')
const {Puzzle} = require('./models/Puzzle')

var puzzleValues = []
var puzzleColumns = []

for(let i = 0; i < sampleData.length; i ++){
	if(sampleData[i].name == "PuzzleData"){
		puzzleColumns = sampleData[i].data[0]
		puzzleValues = sampleData[i].data.splice(1)
		break
	}
}

puzzleValues.forEach((value) => {
	var puzzleData = {}
	puzzleColumns.forEach((key, i) => {
		puzzleData[key] = value[i]
	})
	
	const small = new Puzzle(puzzleData)
	small
		.save()
		.then((puzzle) => {
			console.log(`successfully created ${puzzle.name}`)
		})
		.catch((err) => {
			console.error(`failed to save ${puzzleData[name]}`, err)
		})
})

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
