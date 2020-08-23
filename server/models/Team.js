const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    id: {
        type:String,
        required: true,
        maxlength:50
    },
    name: {
        type:String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    members: [{
        name: {
          type:String,
          maxlength: 50
        },
        discord: {
          type:String,
          maxlength: 50
        }
    }],
    puzzles: {
        id: {
          name: String,
          name: String,
          submission: String,
          score: {
            type:Number,
            default: 0
          },
          status:
            {
              type:String,
              enum: ["correct", "incorrect", "pending", "no attempt"],
              default: "no attempt"
            }
        }
    }
})

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team }
