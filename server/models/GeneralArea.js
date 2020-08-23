const mongoose = require('mongoose');

const generalAreaSchema = mongoose.Schema({
    name: String,
    locations: [{
      name: String,
      image: String,
      puzzleId: String
    }]
})

const User = mongoose.model('GeneralArea', generalAreaSchema);

module.exports = { GeneralArea }
