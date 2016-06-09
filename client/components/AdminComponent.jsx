var React = require("react");

var CoffeePollComponent = require("./admin/CoffeePollComponent.jsx");
var InitialComponent = require("./admin/InitialComponent.jsx");

var comms = require("../utils/comms-client")();

var AdminComponent = React.createClass({

    getInitialState: function () {
        return {
            count: 0,
            clicks: [],
            currentComponent: "InitialComponent",
            usersConnected: 0
        }
    },

    componentDidMount: function() {
        // this.props.ws.onmessage = this.onMessage;
    },

    render: function() {
        var newComponent;
        switch(this.state.currentComponent) {
            case 'InitialComponent': newComponent = <InitialComponent {...this.props} />; break;
            case 'CoffeePollComponent': newComponent = <CoffeePollComponent {...this.props} />; break;
        }
        return (
            <div className="reactComponentContainer">
                <h1 className="f-header">Admin</h1>
                <div className="count">{this.state.count}</div>
                <ul id="clicks">{
                    this.state.clicks.map((click, i) => <p key={i}>{click}</p>)
                }</ul>
                <button className="f-headline" onClick={this.onButtonClick}>CLICK ME TO START SESSION</button>
                <div>{newComponent}</div>
                <p>Users connected: {this.state.usersConnected}</p>
            </div>
        );
    },

    componentDidUpdate: function () {
        this.props.ws.send(JSON.stringify({
            messageType: 'setCurrentComponent',
            messageData: {
                componentName: this.state.currentComponent
            }
        }));
    },

    onButtonClick: function () {
        this.setState({
            currentComponent: 'CoffeePollComponent'
        });
    },

    onMessage: function (event) {

        var jsonEvent = JSON.parse(event.data);
        
        if (jsonEvent.messageType === 'userConnected') {
            this.setState({
                usersConnected: this.state.usersConnected + 1
            })
        }

        // var jsonEvent = JSON.parse(event.data);
        // console.log(jsonEvent);
        // if (jsonEvent.messageType === 'log') {
        //     this.setState({
        //         count: this.state.count + 1
        //     });
        // }
        //
        // if (jsonEvent.messageType === 'showOnAll') {
        //     var message = 'SOMEONE CLICKED: ' + jsonEvent.messageData;
        //     var clicks = this.state.clicks.slice(0);
        //     clicks.push(message);
        //     this.setState({clicks});
        // }

    }

});

exports.AdminComponent = AdminComponent;