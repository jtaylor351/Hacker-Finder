var mongoose = require('mongoose');

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
    universityHost: {
        type: String
    },
    users: {
        type: [ObjectId]
    }
});


var Hackathon = mongoose.model('Hackathon', HackathonSchema);
module.exports = Hackathon;