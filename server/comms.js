module.exports = function (app) {
    var expressWs = require('express-ws')(app);

    var currentComponent ="unknown";

    function setupIndexListeners() {

        app.ws('/', function(ws) {
            ws.on('message', ingestMessage);
        });
    }

    function setupAdminListeners() {
        app.ws('/admin', function(ws) {
            ws.on('message', ingestMessage);
        });
    }

    function ingestMessage(messageObj) {
        console.log(messageObj);
        // Message passed as stringified JSON
        var messageObj = JSON.parse(messageObj);

        // Add each type here and call appropriate methods
        switch (messageObj.messageType) {
            case 'showOnAll':
                sendToAll(messageObj);
            case 'setCurrentComponent':
                setCurrentComponent(messageObj.messageData);    
        }
    }

    function setCurrentComponent(messageObj) {
        currentComponent = messageObj.componentName;
        console.log('setting component to ' + messageObj.componentName);
        sendToAll({
            messageType: 'setCurrentComponent',
            messageData: {
                componentName: currentComponent
            }        
        })
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
