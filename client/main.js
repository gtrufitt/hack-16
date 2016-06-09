var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);

ws.onmessage = function (event) {
    var jsonEvent = JSON.parse(event.data);
    console.log(jsonEvent);
    if (jsonEvent.messageType === 'log') {
        count = count + 1;
        var p = document.createElement('p');
        p.innerHTML = count;
        document.querySelector('#clicks').appendChild(p);
    }
};

var sassify = require('sassify');
var adminCss = require('./admin.scss');

sassify(adminCss);

console.log("hello");
