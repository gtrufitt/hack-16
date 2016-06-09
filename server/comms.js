module.exports = function (app) {
    var expressWs = require('express-ws')(app);


    function setupIndexListeners() {

        app.ws('/', function(ws) {
            ws.on('message', ingestMessage);
        });

        var aWss = expressWs.getWss('/');

        // TEST INTERVAL
        setInterval(function () {
            console.log('ping')
            sendToAll({
                messageType: 'log',
                messageData: 'HELLO'
            });
        }, 5000);

    }

    function setupAdminListeners() {
        app.ws('/admin', function(ws) {
            ws.on('message', ingestMessage);
        });

        // TEST INTERVAL
        setInterval(function () {
            console.log('ping')
            sendToAll({
                messageType: 'log',
                messageData: 'HELLO'
            });
        }, 5000);
    }

    function ingestMessage(messageObj) {
        console.log(messageObj);
        // Message passed as stringified JSON
        var messageObj = JSON.parse(messageObj);

        // Add each type here and call appropriate methods
        switch (messageObj.messageType) {
            case 'showOnAll':
                sendToAll(messageObj);
        }
    }

    function sendToAll(messageObj) {
        var aWss = expressWs.getWss('/');

        aWss.clients.forEach(function each(client) {
            client.send(JSON.stringify(messageObj))
        });
    }

    return {
        setupIndexListeners: setupIndexListeners,
        setupAdminListeners: setupAdminListeners
    }
};
