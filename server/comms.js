module.exports = function (app) {
    var expressWs = require('express-ws')(app);

    var currentComponent ="InitialComponent";

    // Listeners

    function setupIndexListeners() {

        app.ws('/', function(ws) {
            ws.on('message', ingestUserMessage);
        });
    }

    function setupAdminListeners() {
        app.ws('/admin', function(ws) {
            ws.on('message', ingestAdminMessage);
        });
    }

    // Ingest messages

    function ingestAdminMessage(messageObj) {
        if (!messageObj) return;

        console.log(messageObj);
        // Message passed as stringified JSON
        messageObj = JSON.parse(messageObj);

        // Add each type here and call appropriate methods
        // Where possible use 'sendToAll, 'sendToAdmin' and 'sendToClient'
        // directly unless something needs to happen on the server
        switch (messageObj.messageType) {
            case 'sendToAll':
                sendToAll(messageObj.data);
                break;
            case 'sendToClient':
                // NOTE: THIS IS NOT WORKING
                sendToClient(messageObj.clientId, messageObj.data);
                break;
            case 'setCurrentComponent':
                setCurrentComponent(messageObj.messageData);
                break;
            case 'getCurrentComponent':
                getCurrentComponent();
                break;
        }
    }

    function ingestUserMessage(messageObj) {
        console.log('ingest user message');
        console.log(messageObj)
        console.log(messageObj.messageType)
        // Message passed as stringified JSON
        messageObj = JSON.parse(messageObj);

        // Add each type here and call appropriate methods
        switch (messageObj.messageType) {
            case 'sendToAdmin':
                sendToAdmin(messageObj.messageData);
                break;
            case 'setCurrentComponent':
                setCurrentComponent(messageObj.messageData);
                break;
            case 'getCurrentComponent':
                getCurrentComponent();
                break;
            case 'coffeeVote':
                sendToAll(messageObj);
                break;
            case 'getCurrentComponent':
                getCurrentComponent();
                break;
        }
    }

    // Setters

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


    function getCurrentComponent() {
        console.log('get component request ');
        sendToAll({
            messageType: 'getCurrentComponent',
            messageData: {
                componentName: currentComponent
            }
        })
    }

    // Send messages
    function sendToAll(messageObj) {
        var aWss = expressWs.getWss('/');

        aWss.clients.forEach(function each(client) {
            client.send(JSON.stringify(messageObj))
        });
    }

    // This is totally hard to do but if we have time
    // this looks like the way http://stackoverflow.com/questions/16280747/sending-message-to-a-specific-connected-users-using-websocket
    // The chat server demo is useful
    function sendToClient(clientId, messageObj) {
        var aWss = expressWs.getWss('/');

        aWss.clients.forEach(function each(client) {
            client.send(JSON.stringify(messageObj))
        });
    }

    function sendToAdmin(messageObj) {
        var aWss = expressWs.getWss('/admin');

        aWss.clients.forEach(function each(client) {
            client.send(JSON.stringify(messageObj))
        });
    }

    function keepAlivePing() {
        sendToAll({
            messageType: 'ping'
        })
        sendToAdmin({
            messageType: 'ping'
        })
    }

    setInterval(keepAlivePing, 2000);


    return {
        setupIndexListeners: setupIndexListeners,
        setupAdminListeners: setupAdminListeners
    }
};
