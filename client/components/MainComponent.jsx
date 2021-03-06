var React = require("react");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SpotTheBallComponent = require("./user/spotTheBall.jsx");
var CoffeePollComponent = require("./user/CoffeePollComponent.jsx");
var InitialComponent = require("./user/InitialComponent.jsx");
var SeeSawComponent = require("./user/SeeSawComponent.jsx");

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
            case 'InitialComponent': newComponent = <InitialComponent key="InitialComponent" ws={this.props.ws} />; break;
            case 'CoffeePollComponent': newComponent = <CoffeePollComponent key="CoffeePollComponent" ref="CoffeePollComponent" ws={this.props.ws} />; break;
            case 'SpotTheBallComponent': newComponent = <SpotTheBallComponent key="SpotTheBallComponent" ws={this.props.ws} />; break;
            case 'SeeSawComponent': newComponent = <SeeSawComponent key="SeeSawComponent" {...this.props} />; break;
        }
        return (
            <div className="reactComponentContainer">
                <img className="logo" src="./img/logo.jpg" alt=""/>
                <ReactCSSTransitionGroup transitionName="activity" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                    {newComponent}
                </ReactCSSTransitionGroup>
            </div>
        );
    },

    onMessage: function(event) {
        var jsonEvent = JSON.parse(event.data);

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
            case 'ping': {
                break;
            }
            case 'coffeeVote': {
                if(this.refs.CoffeePollComponent){
                    this.refs.CoffeePollComponent.onMessage(event);
                }
                break;
            }
        }
    }

});

module.exports = MainComponent;