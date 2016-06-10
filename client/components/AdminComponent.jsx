var React = require("react");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var CoffeePollComponent = require("./admin/CoffeePollComponent.jsx");
var InitialComponent = require("./admin/InitialComponent.jsx");

var comms = require("../utils/comms-client")();

var AdminComponent = React.createClass({

    getInitialState: function () {
        return {
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
            case 'InitialComponent': newComponent = <InitialComponent key="InitialComponent" {...this.props} />; break;
            case 'CoffeePollComponent': newComponent = <CoffeePollComponent key="CoffeePollComponent" {...this.props} />; break;
        }
        return (
            <div className="reactComponentContainer">
                <h1 className="f-header">Admin</h1>
                <div>
                    <button className="admin-btn f-textSans" onClick={this.setToInitial}>
                        Set to InitialComponent
                    </button>
                </div>
                <div>
                    <button className="admin-btn f-textSans" onClick={this.setToCoffee}>
                        Set to CoffeePollComponent
                    </button>
                </div>                
                <div>
                    <ReactCSSTransitionGroup transitionName="activity--admin" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                        {newComponent}
                    </ReactCSSTransitionGroup>    
                </div>
                <p>Users connected: {this.state.usersConnected}</p>
            </div>
        );
    },

    setToInitial: function () {
        this.setState({
            currentComponent: 'InitialComponent'
        });
    },

    setToCoffee: function () {
        this.setState({
            currentComponent: 'CoffeePollComponent'
        });
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
    }

});

module.exports = AdminComponent;