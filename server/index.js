var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
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

app.use(express.static('public'));

app.ws('/', function(ws, req) {

    ws.on('message', function(msg) {
        console.log(msg);
    });

});

var aWss = expressWs.getWss('/');

setInterval(function () {
    aWss.clients.forEach(function (client) {
        client.send(JSON.stringify({dataType: 'button'}));
    });
}, 5000);

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
