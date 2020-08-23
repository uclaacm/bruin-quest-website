const mongoose = require('mongoose');

const puzzleSchema = mongoose.Schema({
    id: String,
    name: String,
    location: String,
    generalArea: String,
    correctAnswer: String,
    link: String,
    description: String,
    numberOfSolves: {
      type:Number,
      default: 0
    }
})

const User = mongoose.model('Puzzle', puzzleSchema);

module.exports = { Puzzle }
