var mongoose = require('mongoose');

var HackathonSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    location: {
        type: String
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startDay: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    universityHost: {
        type: String,
        required: true,
        trim: true
    }
});


var Hackathon = mongoose.model('Hackathon', HackathonSchema);
module.exports = User;