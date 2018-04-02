var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var mongoose = require('mongoose');
var router = express.Router();


// router.post('/signup', function(req, res, next) {


//     var user = new User({
//             username: req.body.username,
//             password: bcrypt.hashSync(req.body.password, 10),
//             email: req.body.email
//         }

//     );

//     user.save(function(err, result) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'an error occurred',
//                 error: err
//             });
//         }
//         res.status(201).json({
//             message: 'User created',
//             obj: result
//         });
//     });
// });


router.post('/login', function(req, res, next) {
    console.log('LOGIN');
    User.authenticate(req.body.email, req.body.email)
    .then(function(user) {
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
        return res.status(err.status).json({
            title: 'Login failed',
            error: { message: err.message }
        });
    });
});

router.get('/login', function(req, res, next) {
    console.log('LOGIN');
    return res.status(200).json({
            title: 'Login stuff',
            error: { message: 'login in'}
        });
    // User.authenticate(req.body.email, req.body.email)
    // .then(function(user) {
    //     var token = jwt.sign({ user: User }, 'secret', { expiresIn: 7200 });
    //     return res.status(200).json({
    //         message: 'Successfully logged in',
    //         token: token,
    //         email: user.email,
    //         university: user.university,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         bio: user.bio
    //     });
    // })
    // .catch(function(err) {
    //     return res.status(err.status).json({
    //         title: 'Login failed',
    //         error: { message: err.message }
    //     });
    // });
});

        // if (err) {
        //     return res.status(500).json({
        //         title: 'An error occurred',
        //         error: err
        //     });
        // }
        // if (!user) {
        //     return res.status(401).json({
        //         title: 'Login failed',
        //         error: { message: 'Invalid login credentials' }
        //     });
        // }
        // if (!bcrypt.compareSync(req.body.password, user.password)) {
        //     return res.status(401).json({
        //         title: 'Login failed',
        //         error: { message: 'Invalid login credentials' }
        //     });
        // }
//         var token = jwt.sign({ user: User }, 'secret', { expiresIn: 7200 });
//         res.status(200).json({
//             message: 'Successfully logged in',
//             token: token,
//             userId: user._id,
//             username: user.username
//         });
//
//     });
// });

module.exports = router;
