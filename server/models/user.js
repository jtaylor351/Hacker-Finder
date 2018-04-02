var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


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

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validator: emailValidator

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
    password: {
        type: String,
        required: true,
        validator: passValidator
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}


var User = mongoose.model('User', UserSchema);
module.exports = User;
