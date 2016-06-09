var React = require("react");
var CoffeePollComponent = require("./admin/CoffeePollComponent.jsx");
var comms = require("../utils/comms-client")();

var AdminComponent = React.createClass({

    getInitialState: function () {
        return {
            count: 0,
            clicks: [],
            currentComponent: "CoffeePollComponent"
        }
    },

    componentDidMount: function() {
        // this.props.ws.onmessage = this.onMessage;
    },

    render: function() {        
        var newComponent = <CoffeePollComponent {...this.props}/>;
        return (
            <div className="reactComponentContainer">
                <h1 className="f-header">Admin</h1>
                <div className="count">{this.state.count}</div>
                <ul id="clicks">{
                    this.state.clicks.map((click, i) => <p key={i}>{click}</p>)
                }</ul>
                <div>
                    <button className="f-textSans" onClick={this.setToCoffee}>
                        Set to CoffeePollComponent
                    </button>
                </div>
                <div>
                    <button className="f-textSans" onClick={this.setToInitial}>
                        Set to InitialComponent
                    </button>
                </div>    
                <div>{newComponent}</div>
                
            </div>
        );
    },

    setToInitial: function () {        
        this.setCurrentComponent('InitialComponent');
    },

    setToCoffee: function () {
        this.setCurrentComponent('CoffeePollComponent');
    },

    setCurrentComponent: function (component) {
        this.setState({
            currentComponent: component
        });
        comms.sendAMessage({
            messageType: 'setCurrentComponent',
            messageData: {
                componentName: component
            }
        });
    },

    onMessage: function (event) {
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

module.exports = AdminComponent;