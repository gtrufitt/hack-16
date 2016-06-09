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
var indexCss = require('./index.scss');

if (window.location.pathname.indexOf('admin') > -1) {
    console.log(adminCss)
    sassify(adminCss);
} else {
    console.log(indexCss)
    sassify(indexCss);
}

var React = require("react");
var ReactDOM = require('react-dom');
var component = window.location.pathname.indexOf('admin') > -1 ?
    React.createFactory(require("./components/AdminComponent.jsx").AdminComponent) :
    React.createFactory(require("./components/MainComponent.jsx").MainComponent);

var loadFonts = require('./fonts');
loadFonts();

ReactDOM.render(
    component({
        ws: ws
    }),

    document.getElementById('react-container')
);
