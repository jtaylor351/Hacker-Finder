var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var mongoose = require('mongoose');
var router = express.Router();


router.post('/signup', function(req, res, next) {
    // console.log(req.body);
    var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            university: req.body.university
        }
    );

    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'an error occurred',
                error: err
            });
        }
        return res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


router.post('/login', function (req, res, next) {
    User.authenticate(req.body.email)
        .then(function (user) {
            if (!user) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credential' }
                });
            }
            // console.log(user);
            bcrypt.compare(req.body.password, user.password)
                .then(function (isCorrect) {
                    // res == true
                    if (isCorrect) {
                        var token = jwt.sign({ user: User }, 'secret', { expiresIn: 7200 });
                        return res.status(200).json({
                            message: 'Successfully logged in',
                            token: token,
                            email: user.email,
                            university: user.university,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            bio: user.bio
                        });
                    }
                    return res.status(401).json({
                        title: 'Login failed',
                        error: {message: 'Wrong Password'}
                    });
                })
                .catch(function (err) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: {message: err.message }
                    });
                });
        })
        .catch(function (err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});

router.post('/interested-hackathons', function (req, res, next) {

    // User.findOne({ email: email }).exec();
    User.findOne({_id: req.body.requestee_id}).exec()
    .then(function(user) {
        //add to user's array of conections
        User.update({_id: user.id}, {$set: {interestedHacks: user.interestedHacks.concat([{user_id: req.body.requester_id, accepted:false}])}});
    })
    .catch(function(err) {
        return res.status(err.status).json({
            title: 'Problem on our end, please try again later',
            error: { message: err.message }
        });
    });
});

router.put('/interested-hackathons', function (req, res, next) {

    // User.findOne({ email: email }).exec();
    User.findOne({ _id: req.body.requester_id }).exec()
        .then(function (user) {
            //add to user's array of conections
            User.update({ _id: req.body.requester_id }, { $set: { interestedHacks: user.interestedHacks.concat([{ user_id: req.body.requestee_id, accepted: true}]) } });
        })
        .catch(function (err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });

    // User.findOne({ email: email }).exec();
    User.findOne({ _id: req.body.requestee_id }).exec()
        .then(function (user) {
            //add to user's array of conections
            //For loop to change the requestee's array so that the accepted is true
            // var i;
            // for (i = 0; i < user.)
            User.update({ _id: req.body.requester_id }, { $set: { interestedHacks: user.interestedHacks.concat([{ user_id: req.body.requestee_id, accepted: true }]) } });
        })
        .catch(function (err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});

module.exports = router;