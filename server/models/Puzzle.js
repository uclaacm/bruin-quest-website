'use strict';
const mongoose = require('mongoose');

const puzzleSchema = mongoose.Schema({
    name: String,
    location: String,
    generalArea: String,
    correctAnswer: String,
    link: String,
    description: String,
    difficulty: {
      type:String,
      enum: ['lower div', 'upper div', 'super senior']
    },
    numberOfSolves: {
      type:Number,
      default: 0
    }
})

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = { Puzzle }
