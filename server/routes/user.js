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
    });

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


router.post('/login', function(req, res, next) {
    User.authenticate(req.body.email)
        .then(function(user) {
            if (!user) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: { message: 'Invalid login credential' }
                });
            }
            // console.log(user);
            bcrypt.compare(req.body.password, user.password)
                .then(function(isCorrect) {
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
                            bio: user.bio,
                            interestedHacks: user.interestedHacks,
                            userId: user._id
                        });
                    }
                    return res.status(401).json({
                        title: 'Login failed',
                        error: { message: 'Wrong Password' }
                    });
                })
                .catch(function(err) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: { message: err.message }
                    });
                });
        })
        .catch(function(err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});


router.post('/interested-hackathons', function(req, res, next) {
    User.findByIdAndUpdate(req.body.userId, { $push: { interestedHacks: req.body.hackathonId } }, { 'new': true }).exec()
        .then(function(user) {
            return res.status(200).json({
                message: 'Success',
                email: user.email,
                university: user.university,
                firstName: user.firstName,
                lastName: user.lastName,
                bio: user.bio,
                interestedHacks: user.interestedHacks,
                acceptedConnections: user.acceptedConnections,
                pendingConnections: user.pendingConnections,
                picture: user.picture
            });
        })
        .catch(function(err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});


// populating the interestedHacks field
router.get('/interested-hackathons', function (req, res, next) {
    User.findOne({_id: req.body.userId})
    .populate('interestedHacks')
    .exec()
    .then(function(user) {
        return res.status(200).json({
            message: 'Success',
            email: user.email,
            _id: user._id,
            university: user.university,
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            interestedHacks: user.interestedHacks,
            acceptedConnections: user.acceptedConnections,
            pendingConnections: user.pendingConnections,
            picture: user.picture
        });
    })
    .catch(function(err) {
        return res.status(err.status).json({
            title: 'Problem on our end, please try again later',
            error: { message: err.message }
        });
    });
});

// requester is the person sending a conection request
// requestee is the person the request is being sent to
// acttion: requester sending conection request to requestee
router.post('/connect', function(req, res, next) {
    User.findByIdAndUpdate(req.body.requestee_id, { $push: { pendingConnections: req.body.requester_id } }, { 'new': true }).exec()
        .then(function(user) {
            return res.status(200).json({
                message: 'Request Sent!'
            });
        })
        .catch(function(err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});

// requester is the person who's request is being accepted
// requestee is the person accepting the request from pending
// acttion: requestee accepting conection request from requester
router.put('/connect', function(req, res, next) {
    User.findByIdAndUpdate(req.body.requester_id, { $push: { acceptedConnections: req.body.requestee_id } }, { 'new': true }).exec()
        .then(function(user) {
            return User.findByIdAndUpdate(req.body.requestee_id, { $push: { acceptedConnections: req.body.requester_id }, $pull: { pendingConnections: req.body.requester_id } }, { 'new': true }).exec()
        })
        .then(function(requestee) {
            return res.status(200).json({ message: 'Connection Made!' });
        })
        .catch(function(err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});

// requester is the person sending a conection request
// requestee is the person the request is being sent to
// acttion: requestee rejecting conection request from requester
router.delete('/connect', function(req, res, next) {
    User.findByIdAndUpdate(req.body.requestee_id, { $pull: { pendingConnections: req.body.requester_id } }, { 'new': true }).exec()
        .then(function(user) {
            return res.status(200).json({
                message: 'Request Sent!'
            });
        })
        .catch(function(err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});

module.exports = router;