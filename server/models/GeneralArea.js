const mongoose = require('mongoose');

const generalAreaSchema = mongoose.Schema({
    name: String,
    locations: [{
      name: String,
      image: String,
      puzzleId: String
    }]
})

const GeneralArea = mongoose.model('GeneralArea', generalAreaSchema);

module.exports = { GeneralArea }
