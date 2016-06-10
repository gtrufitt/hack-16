
//CoffeePollComponent.jsx

var React = require("react");
var comms = require("../../utils/comms-client")();

var CoffeePollComponent = React.createClass({

    getInitialState: function(){
        var numbers = [0,1,2,3,4,5,6,7];
        var state = {numbers, width:500};
        for(var i in numbers){
            state['had' + i] = 0;
        }
        return state
    },

    componentDidMount: function() {
        console.log("The coffee poll component mounted!!")
        this.props.ws.onmessage = this.onMessage;
    },

    render: function() {
        var that = this;
        var totalVotes = this.state.numbers.map(i => this.state["had" + i]);
        var lessCaffeinated = 0;
        var total = totalVotes.reduce(function(previousValue, currentValue, currentIndex) {
            if (currentIndex === that.state.numberOfCoffees) lessCaffeinated = previousValue;
            return previousValue + currentValue;
        });
        var p = Math.round(10000 * lessCaffeinated/Math.max(total - 1, 1)) / 100;

        return (
            <div className="coffeePollComponent">
                <h2 className="f-header">Question 1</h2>
                <h3 className="f-header">How many coffees have you had today?</h3>
                {!this.state.numberOfCoffees && this.state.numbers.map((_, i)=> (
                    <button
                        key={i}
                        className="admin-btn f-textSans"
                        onClick={this.onButtonClick.bind(this, i)}>{
                        i || "tea"
                    }</button>
                ))}
                {!!this.state.numberOfCoffees &&
                <div>
                    <p>
                        Thanks for voting!
                    </p>
                    <p>
                        You are more caffeinated than <strong>{p}%</strong> of today's hackers.
                    </p>
                    <p>
                        Watch for the full results on the big screen...
                    </p>
                </div>
                }
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
    },

    onMessage: function(event) {
        var jsonEvent = JSON.parse(event.data);

        if (jsonEvent.messageType === 'coffeeVote') {
            var number = jsonEvent.messageData.numberOfCoffees;
            var newState = {};
            newState['had'+ number] = this.state['had'+ number] + 1;
            this.setState(newState);
        }
    }

});

module.exports = CoffeePollComponent;