var express = require('express');
var router = express.Router();


// GET route for reading data
router.get('/', function(req, res, next) {
    // res.send("You got the root");
    res.render('index');
});

module.exports = router;