var React = require("react");
var comms = require("../utils/comms-client")();

var Coffee = React.createClass({

    getInitialState: function(){
        return {
            buttons: [0,1,2,3,4,5,6,7]
        }
    },

    componentDidMount: function() {
        console.log("The coffee component mounted!!")
    },

    render: function() {
        return (
            <div className="Coffee">
                <h1>How many coffees have you had today?</h1>
                <ul id="clicks"></ul>
                {this.state.buttons.map((_, i)=> (
                    <button onClick={this.onButtonClick.bind(this, i)}>{i}</button>
                ))}
            </div>
        );
    },

    onButtonClick: function (numberOfCoffees) {
        comms.sendAMessage({
            messageType: 'showOnAll',
            messageData: {
                messageType: 'log',
                messageData: {
                    coffees: numberOfCoffees
                }
            }
        })
    }

});

module.exports = Coffee;