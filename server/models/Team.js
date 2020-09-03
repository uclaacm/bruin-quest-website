'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const teamSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
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
          submission: String,
          score: {
            type:Number,
            default: 0
          },
          status:
            {
              type:String,
              enum: ['correct', 'incorrect', 'pending', 'no attempt'],
              default: 'no attempt'
            }
        }
    }
})

teamSchema.pre('save', function( next ) {
    var team = this;

    if(team.isModified('password')){
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(team.password, salt, function(err, hash){
                if(err) return next(err);
                team.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

teamSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

teamSchema.methods.generateToken = function(cb) {
    var team = this;
    console.log('team',team)
    console.log('teamSchema', teamSchema)
    var token =  jwt.sign(team._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    team.tokenExp = oneHour;
    team.token = token;
    team.save(function (err, team){
        if(err) return cb(err)
        cb(null, team);
    })
}

teamSchema.statics.findByToken = function (token, cb) {
    var team = this;

    jwt.verify(token,'secret',function(err, decode){
        team.findOne({'_id':decode, 'token':token}, function(err, team){
            if(err) return cb(err);
            cb(null, team);
        })
    })
}

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team }
