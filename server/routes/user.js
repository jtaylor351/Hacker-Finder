var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var mongoose = require('mongoose');
var router = express.Router();


router.post('/signup', function(req, res, next) {
    
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
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


router.post('/login', function(req, res, next) {
    console.log('LOGIN');
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
                .then(function(res) {
                    // res == true
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
                })
                .catch(function(err) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: { message: err.message }
                    });
                });
        })
        .catch(function(err) {
            console.log("Server Side Problem");
            console.log(err.message);
            return res.status(err.status).json({
                title: 'Problem on our end, please try again later',
                error: { message: err.message }
            });
        });
});

module.exports = router;