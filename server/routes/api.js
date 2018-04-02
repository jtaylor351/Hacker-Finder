var express = require('express');
var router = express.Router();


// GET route for reading data
router.get('/', function(req, res, next) {
    console.log('get');
    // return res.render('../../src/index.html');
    res.send("You got the root")
});

module.exports = router;
