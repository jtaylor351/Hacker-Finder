// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');


// Get our API routes
const api = require('./server/routes/api');
// const guides = require('server/routes/guides');
const user = require('./server/routes/user');
// const create = require('./server/routes/create');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/i2p');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

/**
 * Get port from environment and store in Express.
 */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Set our api routes
app.use('/user', user);
app.use('/', api);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(function(req, res, next) {
    return res.render('index');
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;
