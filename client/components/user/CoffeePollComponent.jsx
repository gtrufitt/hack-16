
//CoffeePollComponent.jsx

var React = require("react");
var comms = require("../../utils/comms-client")();

var CoffeePollComponent = React.createClass({

    getInitialState: function(){
        return {
            buttons: [0,1,2,3,4,5,6,7]
        }
    },

    componentDidMount: function() {
        console.log("The coffee poll component mounted!!")
    },

    render: function() {
        return (
            <div className="coffeePollComponent">
                <h2 className="f-header">User Coffee Poll</h2>
                {this.state.buttons.map((_, i)=> (
                    <button key={i} onClick={this.onButtonClick.bind(this, i)}>{i}</button>
                ))}
            </div>
        );
    },

    onButtonClick: function (i){
        comms.sendAMessage({
            messageType: 'coffeeVote',
            messageData: {
                numberOfCoffees: i
            }
        });
    }

});

module.exports = CoffeePollComponent;