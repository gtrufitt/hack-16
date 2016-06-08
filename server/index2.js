var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var expressWs = require('express-ws')(app);
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port);

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});


// Websocket

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

function sendToAdmin() {

}

function sendToAll(data, type) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({
      dataType: type,
      points: data
    }))
  });
}

wss.on("connection", function(ws) {


  console.log("websocket connection open")

  ws.on('message', function(message) {
    var jsonMessage = JSON.parse(message);
    
    console.log(jsonMessage)

    switch (jsonMessage.dataType) {
      case 'pointPlot':
          sendToAll(jsonMessage.data, 'pointPlot')
    }

  });

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
});
