var comms = function() {
    var host = location.origin.replace(/^http/, 'ws')
    var ws = new WebSocket(host);

    ws.onmessage = function (event) {
        var jsonEvent = JSON.parse(event.data);

        console.log('gotAMessage', jsonEvent);

        switch(jsonEvent.messageType) {
            case 'log':
                console.log(jsonEvent.messageData);
                break;
            case 'updateState':
                console.log('update state');
                updateState();
                break;
            case 'ringABell':
                console.log('you rang?')
                break;
        }
    };

    function sendAMessage(messageObj) {
        console.log('sendAMessage - messageObj:', messageObj)
        if (typeof messageObj.messageType !== 'string') {
            console.error('messageType must be a string');
        }

        if (typeof messageObj.messageData !== 'object') {
            console.error('messageData must be an object');
        }

        ws.send(JSON.stringify(messageObj));
    }

    function updateState() {
        console.log('update dis')
    }

    return {
        sendAMessage: sendAMessage
    }
};

module.exports = comms;
