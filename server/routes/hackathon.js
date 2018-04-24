var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Hackathon = require('../models/hackathon');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/', function(req, res, next) {


    if (Date.parse(req.body.startDate) === NaN ||
        Date.parse(req.body.endDate) === NaN) {
        return res.status(400).json({
            error: "Invalid Date"
        });
    }

    var start = new Date(req.body.startDate);
    var end = new Date(req.body.endDate);

    if (+start >= +end) {
        return res.status(400).json({
            error: "Invalid Date"
        });
    }

    var hack = new Hackathon({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        startDate: start,
        endDate: end,
        host: req.body.host
    });

    hack.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'an error occurred',
                error: err
            });
        }
        return res.status(201).json({
            message: 'Hackathon created',
            obj: result
        });
    });
});


router.get('/interested-users', function(req, res, next) {

    var user_ids = [];
    var return_users = [];

    req.body.users.forEach(function(element) {
        user_ids.push(mongoose.Types.ObjectId(element));
    });

    User.find({
            '_id': { $in: user_ids }
        }).exec()
        .then(function(user_array) {
            user_array.forEach(function(user) {
                return_users.push({
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
            });

            return res.status(200).json({
                message: 'Success',
                users: return_users
            });
        })
        .catch(function(err) {
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});


router.get('/:title/:date', function(req, res, next) {
    Hackathon.findOne({ date: req.params.date, title: req.params.title }).exec()
        .then(function(hack) {
            return res.status(200).json({
                hackathon: hack
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