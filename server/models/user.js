var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var validate = require('mongoose-validator');
var Hackathon = require('./hackathon');

const SCHOOLS = ["uga", "gatech"]; // const does not mean constant, just that variable can't be reasigned
const SALT_ROUNDS = 10;

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Name should contain alpha-numeric characters only',
    }),
]

var emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 254],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isEmail',
        message: 'Must be a valid email',
    }),
]

var passValidator = [
    validate({
        validator: 'isLength',
        arguments: [8, 30],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]

var universityValidator = [
    validate({
        validator: function(val) {
            val = val + '';
            SCHOOLS.forEach(function(school) {
                if (val == school) {
                    return true;
                }
            });
            return false;
        },
        message: 'University must be either "uga" or "gatech"',
    })
]

var bioValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 2000]
    })
]


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validator: emailValidator

    },
    password: {
        type: String,
        required: true,
        validator: passValidator
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        validator: nameValidator
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        validator: nameValidator
    },
    university: {
        type: String,
        required: true,
        trim: true,
        validator: universityValidator
    },
    bio: {
        type: String,
        required: true,
        validator: bioValidator
    },
    acceptedConnections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    pendingConnections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    interestedHacks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hackathon'
    }],
    picture: {
        type: String,
    }
});

//authenticate input against database

UserSchema.statics.authenticate = function(email) {
    return User.findOne({ email: email }).exec();
}


var User = mongoose.model('User', UserSchema);
module.exports = User;
