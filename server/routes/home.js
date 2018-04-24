var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Hackathon = require('../models/hackathon');
var mongoose = require('mongoose');
var router = express.Router();



//@jordan, dont worry I did it
router.get('/', function(req, res, next) {
    Hackathon.find()
        .exec(function(err, hackathons) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
<<<<<<< HEAD
                message: 'Hackathons Retrieved',
                obj: hackathons
=======
                message: 'Saved message',
                obj: hackathon
>>>>>>> 8ae4ecef36b9a9f6358b167263193a388b5ea82a

            });
        });

});




module.exports = router;