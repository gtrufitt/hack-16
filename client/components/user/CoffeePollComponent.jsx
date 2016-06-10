
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
                <h2 className="f-header">Question 1</h2>
                <h3 className="f-header">How many coffees have you had today?</h3>
                {!this.state.numberOfCoffees && this.state.buttons.map((_, i)=> (
                    <button
                        key={i}
                        className="admin-btn f-textSans"
                        onClick={this.onButtonClick.bind(this, i)}>{
                        i || "tea"
                    }</button>
                ))}
                {!!this.state.numberOfCoffees && <p>
                    Thanks for voting! Watch for the results on the big screen...
                </p>}
            </div>
        );
    },

    onButtonClick: function (i){
        this.setState({numberOfCoffees: i || "tea"});
        comms.sendAMessage({
            messageType: 'coffeeVote',
            messageData: {
                numberOfCoffees: i
            }
        });
    }

});

module.exports = CoffeePollComponent;