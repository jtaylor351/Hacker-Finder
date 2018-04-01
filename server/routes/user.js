// var express = require('express');
// var Guide = require('../../models/guide');
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var User = require('../../models/user');
// var mongoose = require('mongoose');
// var router = express.Router();


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


// router.post('/login', function(req, res, next) {
//     User.findOne({ username: req.body.username }, function(err, user) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         if (!user) {
//             return res.status(401).json({
//                 title: 'Login failed',
//                 error: { message: 'Invalid login credentials' }
//             });
//         }
//         if (!bcrypt.compareSync(req.body.password, user.password)) {
//             return res.status(401).json({
//                 title: 'Login failed',
//                 error: { message: 'Invalid login credentials' }
//             });
//         }
//         var token = jwt.sign({ user: User }, 'secret', { expiresIn: 7200 });
//         res.status(200).json({
//             message: 'Successfully logged in',
//             token: token,
//             userId: user._id,
//             username: user.username
//         });

//     });
// });

// module.exports = router;