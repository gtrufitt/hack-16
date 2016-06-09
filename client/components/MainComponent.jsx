var React = require("react");
var comms = require("../utils/comms-client")();

var MainComponent = React.createClass({

    // Just to show it's possible to manipulate DOM with JQuery inside React
    componentDidMount: function() {
        console.log("The main component mounted!!")
    },

    render: function() {
        var sendAMessage = function () {
            comms.sendAMessage({
                messageType: 'showOnAll',
                messageData: {
                    messageType: 'log',
                    messageData: {
                        main: 'testData'
                    }
                }
            })
        };

        return (
            <div className="reactComponentContainer">
                <h1>Hello {this.props.name}</h1>
                <p>This is rendered with a React JSX Component! yeah</p>
                <button onClick={sendAMessage}>Hello There</button>
            </div>
        );
    }

});

exports.MainComponent = MainComponent;