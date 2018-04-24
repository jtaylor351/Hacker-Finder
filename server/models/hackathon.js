var mongoose = require('mongoose');
var User = require('./user');

var HackathonSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    host: {
        type: String
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    universityPicture: [{
        type: String
    }],
    hackathonUrl: [{
        type: String
    }]

});


var Hackathon = mongoose.model('Hackathon', HackathonSchema);
module.exports = Hackathon;