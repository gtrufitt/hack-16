var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);

var count = 0;

ws.onmessage = function (event) {
    var jsonEvent = JSON.parse(event.data);
    console.log(jsonEvent);
    if (jsonEvent.messageType === 'log') {
        count = count + 1;
        var p = document.createElement('p');
        p.innerHTML = count;
        document.querySelector('#clicks').appendChild(p);
    }

    if (jsonEvent.messageType === 'showOnAll') {
        var p = document.createElement('p');
        p.innerHTML = 'SOMEONE CLICKED: ' + jsonEvent.messageData;
        document.querySelector('#clicks').appendChild(p);
    }
};

var sassify = require('sassify');
var adminCss = require('./admin.scss');

sassify(adminCss);

console.log("hello");

var React = require("react");
var ReactDOM = require('react-dom');
var MainComponent = React.createFactory(require("./components/MainComponent.jsx").MainComponent);

ReactDOM.render(
    MainComponent({
        name: "Lydia"
    }),

    document.getElementById('react-container')
);
