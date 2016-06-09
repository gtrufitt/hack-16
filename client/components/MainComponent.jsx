var React = require("react");


var CoffeePollComponent = require("./user/CoffeePollComponent.jsx");
var InitialComponent = require("./user/InitialComponent.jsx");

var MainComponent = React.createClass({

    getInitialState: function () {
        return {
            currentComponent: "InitialComponent"
        }
    },

    componentDidMount: function() {
        this.props.ws.onmessage = this.onMessage;
        console.log("The main component mounted!!")
    },

    render: function() {
        var newComponent;
        switch(this.state.currentComponent) {
            case 'InitialComponent': newComponent = <InitialComponent ws={this.props.ws} />; break;
            case 'CoffeePollComponent': newComponent = <CoffeePollComponent ws={this.props.ws} />; break;
        }
        return (
            <div className="reactComponentContainer">
                <img className="logo" src="./img/logo.jpg" alt=""/>
                <h1>Welcome</h1>
                {newComponent}
            </div>
        );
    },

    onMessage: function(event) {
        var jsonEvent = JSON.parse(event.data);
        console.log(jsonEvent);

        if (jsonEvent.messageType === 'setCurrentComponent') {
            this.setState({
                currentComponent: jsonEvent.messageData.componentName
            });
        }

        if (jsonEvent.messageType === 'showOnAll') {
            var message = 'SOMEONE CLICKED: ' + jsonEvent.messageData;
            var clicks = this.state.clicks.slice(0);
            clicks.push(message);
            this.setState({clicks});
        }

    }



});

exports.MainComponent = MainComponent;