var mongoose = require('mongoose');

var HackathonSchema = new mongoose.Schema({
    name: {
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
    year: {
        type: Number,
        required: true,
    }
    universityHost: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        required: false
    }

});


var Hackathon = mongoose.model('Hackathon', HackathonSchema);
module.exports = User;
