var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var validate = require('mongoose-validator');

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
        arguments: [0, 2000],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
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
        required: false,
        validator: bioValidator
    }
});

//authenticate input against database

UserSchema.statics.authenticate = new Promise(function(email, password) {
    User.findOne({ email: email }).exec()
        .then(function(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    console.log(err.message)
                    reject(err);
                }
                if (result === true) {
                    resolve(user);
                }
                var err = new Error('Invalid Password');
                err.status = 401;
                console.log(err.message);
                reject(err);
            });
        })
        .catch(function(err) {
            console.log(err.message);
            reject(err);
        });
});


var User = mongoose.model('User', UserSchema);
module.exports = User;