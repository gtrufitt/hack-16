// CSS

var sassify = require('sassify');
var adminCss = require('./admin.scss');
var indexCss = require('./index.scss');
var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host)

if (window.location.pathname.indexOf('admin') > -1) {
    sassify(adminCss);
} else {
    sassify(indexCss);
}

// React

var React = require("react");
var ReactDOM = require('react-dom');
var adminComponent = require("./components/AdminComponent.jsx").AdminComponent;
var mainComponent = require("./components/MainComponent.jsx").MainComponent;
var component = React.createFactory(window.location.pathname.indexOf('admin') > -1 ? adminComponent : mainComponent);

var loadFonts = require('./fonts');
loadFonts();

ReactDOM.render(
    component({
        ws: ws
    }),

    document.getElementById('react-container')
);