var React = require("react");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var CoffeePollComponent = require("./user/CoffeePollComponent.jsx");
var InitialComponent = require("./user/InitialComponent.jsx");

var MainComponent = React.createClass({

    getInitialState: function () {
        return {
            currentComponent: "InitialComponent",
            clicks: []
        }
    },

    componentDidMount: function() {

        var ws = this.props.ws;
        
        ws.onmessage = this.onMessage;
        console.log("The main component mounted!!");

        ws.onopen = function() {

            ws.send(JSON.stringify({
                messageType: 'getCurrentComponent'
            }));
        };
    },

    render: function() {
        var newComponent;
        switch(this.state.currentComponent) {
            case 'InitialComponent': newComponent = <InitialComponent key="InitialComponent"/>; break;
            case 'CoffeePollComponent': newComponent = <CoffeePollComponent key="CoffeePollComponent"/>; break;
        }
        return (
            <div className="reactComponentContainer">
                <img className="logo" src="./img/logo.jpg" alt=""/>
                <ReactCSSTransitionGroup transitionName="activity" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {newComponent}
                </ReactCSSTransitionGroup>                
            </div>
        );
    },

    onMessage: function(event) {
        var jsonEvent = JSON.parse(event.data);
        console.log(jsonEvent);

        switch(jsonEvent.messageType){
            case 'setCurrentComponent':
            case 'getCurrentComponent': {
                this.setState({
                    currentComponent: jsonEvent.messageData.componentName
                });
                break;
            }
            case 'showOnAll': {
                var message = 'SOMEONE CLICKED: ' + jsonEvent.messageData;
                var clicks = this.state.clicks.slice(0);
                clicks.push(message);
                this.setState({clicks});
                break;
            }
        }
    }

});

module.exports = MainComponent;