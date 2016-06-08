var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.listen(7000);

var connections = []; // Keeps track of all connections

// ROUTES FOR OUR APP
// =============================================================================

app.get('/', function (req, res) {
    res.sendFile('index.html', {"root": 'client'});
});

app.get('/admin', function (req, res) {
    res.sendFile('admin.html', {"root": 'client'});
});

app.ws('/', function(ws, req) {
    connections.push(ws);

    connections.forEach(function(c){
        c.send(JSON.stringify({
            dataType: 'button'
        }))
    });

    ws.on('message', function(msg) {
        console.log(msg);
    });

});



app.ws('/admin', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

function sendToAll(data, type) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
            dataType: type,
            points: data
        }))
    });
}
