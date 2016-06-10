var React = require("react");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SpotTheBallComponent = require("./admin/spotTheBall.jsx");
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
        this.props.ws.onmessage = this.onMessage;
    },

    render: function() {
        var newComponent;
        switch(this.state.currentComponent) {
            case 'InitialComponent': newComponent = <InitialComponent key="InitialComponent" {...this.props} />; break;
            case 'CoffeePollComponent': newComponent = <CoffeePollComponent key="CoffeePollComponent" {...this.props} />; break;
            case 'SpotTheBallComponent': newComponent = <SpotTheBallComponent key="SpotTheBallComponent" {...this.props} />; break;
        }
        return (
            <div className="reactComponentContainer admin--container">
                <header className="header">
                    <img className="logo" src="./img/logo.jpg" alt=""/>
                </header>

                <div className="admin--component">
                    <ReactCSSTransitionGroup transitionName="activity--admin" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                        {newComponent}
                    </ReactCSSTransitionGroup>    
                </div>
                <footer className="footer">
                    <div className="admin-btn--wrap">
                        <div>
                            <button className="admin-btn f-textSans" onClick={this.setToInitial}>
                                START!
                            </button>
                        </div>
                        <div>
                            <button className="admin-btn f-textSans" onClick={this.setToCoffee}>
                                POLL
                            </button>
                        </div>
                        <div>
                            <button className="admin-btn f-textSans" onClick={this.setToSpotTheBall}>
                                SPOT THE BALL
                            </button>
                        </div>
                    </div>
                    <p className="admin--connected">Connected: {this.state.usersConnected}</p>
                </footer>
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

    setToSpotTheBall: function () {
        this.setState({
            currentComponent: 'SpotTheBallComponent'
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

        switch(jsonEvent.messageType){
            case 'userConnected': {
                this.setState({
                    usersConnected: this.state.usersConnected + 1
                })
                break;
            }
            case 'ping': {
                break;
            }
        }
    }

});

module.exports = AdminComponent;