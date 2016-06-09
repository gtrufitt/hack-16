// CSS

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

// Utils

require('./utils/comms-client.js')();


console.log("hello");

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