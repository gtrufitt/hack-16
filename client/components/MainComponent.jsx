var React = require("react");
var comms = require("../utils/comms-client")();

var MainComponent = React.createClass({

    componentDidMount: function() {
        console.log("The main component mounted!!")
    },

    render: function() {
        return (
            <div className="reactComponentContainer">
                <h1>Welcome</h1>
                <img class="logo" src="./img/logo.jpg" alt=""/>
                <button onClick={this.onButtonClick}>CLICK ME</button>
            </div>
        );
    },

    onButtonClick: function () {
            comms.sendAMessage({
                messageType: 'showOnAll',
                messageData: {
                    messageType: 'log',
                    messageData: {
                        main: 'testData'
                    }
                }
            })
    }

});

exports.MainComponent = MainComponent;