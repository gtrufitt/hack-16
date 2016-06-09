var express = require('express');
var app = express();
var comms = require('./comms')(app);
var port = process.env.PORT || 7000;

app.listen(port);

var connections = []; // Keeps track of all connections

// ROUTES FOR OUR APP
// =============================================================================

app.get('/', function (req, res) {
    res.sendFile('index.html', {"root": 'client'});
});

app.get('/admin', function (req, res) {
    res.sendFile('admin.html', {"root": 'client'});
});

comms.setupIndexListeners();

app.use(express.static('public'));



