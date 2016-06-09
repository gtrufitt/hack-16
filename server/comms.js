module.exports = function (app) {
    var expressWs = require('express-ws')(app);


    function setupIndexListeners() {

        app.ws('/', function(ws) {
            ws.on('message', ingestMessage);
        });

        var aWss = expressWs.getWss('/');

        // TEST INTERVAL
        setInterval(function () {
            sendToAll({
                messageType: 'log',
                messageData: 'HELLO'
            }, aWss);
        }, 5000);

    }

    function setupAdminListeners() {
        app.ws('/admin', function(ws) {
            ws.on('message', ingestMessage);
        });
    }

    function ingestMessage(messageObj) {
        console.log(messageObj)
    }

    function sendToAll(messageObj) {
        aWss.clients.forEach(function each(client) {
            client.send(JSON.stringify(messageObj))
        });
    }

    return {
        setupIndexListeners: setupIndexListeners,
        setupAdminListeners: setupAdminListeners
    }
};
