require('whatwg-fetch');

// CSS
var sassify = require('sassify');
var adminCss = require('./admin.scss');
var indexCss = require('./index.scss');
var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);

if (window.location.pathname.indexOf('admin') > -1) {
    sassify(adminCss);
} else {
    sassify(indexCss);
}

// React

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