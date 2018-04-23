var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Hackathon = require('../models/hackathon');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/', function (req, res, next) {

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

router.get('/', function (req, res, next) {
    // User.findOne({ email: email }).exec();
    Hackathon.findOne({date: req.params.data, title: req.params.title}).exec()
    .then(function(hack) {
        return res.status(200).json({
            hackathon: hack
        });
        //add to user's array of conections 
    })
    .catch(function(err) {
        return res.status(err.status).json({
            title: 'Problem on our end, please try again later',
            error: { message: err.message }
        });
    });
});