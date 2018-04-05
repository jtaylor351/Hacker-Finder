var express = require('express');
var router = express.Router();


// GET route for reading data
router.get('/', function(req, res, next) {
    // res.render('index');
    // return res.sendFile('./src/index.html');
    res.send("You got the root");
});

module.exports = router;
