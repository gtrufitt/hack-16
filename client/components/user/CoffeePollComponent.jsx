
//CoffeePollComponent.jsx

var React = require("react");
var comms = require("../../utils/comms-client")();

var CoffeePollComponent = React.createClass({

    getInitialState: function(){
        var numbers = [0,1,2,3,4,5,6,7];
        return {numbers, width:500}
    },

    componentDidMount: function() {
        console.log("The coffee poll component mounted!!")
    },

    render: function() {
        var hasResults = this.state.had0 !== undefined;
        var that = this;
        if(hasResults){
            var totalVotes = this.state.numbers.map(i => this.state["had" + i]);
            var lessCaffeinated = 0;
            var total = totalVotes.reduce(function(previousValue, currentValue, currentIndex) {
                if (currentIndex === that.state.numberOfCoffees) lessCaffeinated = previousValue;
                return previousValue + currentValue;
            });
            var p = Math.min(Math.round(10000 * lessCaffeinated/Math.max(total - 1, 1)) / 100, 100);
        }

        return (
            <div className="coffeePollComponent">
                <h3 className="f-header">How many coffees have you had today?</h3>
                {!this.state.numberOfCoffees && this.state.numbers.map((_, i)=> (
                    <button
                        key={i}
                        className="admin-btn f-textSans"
                        onClick={this.onButtonClick.bind(this, i)}>{
                        i || "none"
                    }</button>
                ))}
                {!!this.state.numberOfCoffees &&
                    <div>
                    <p>
                        Thanks for voting!
                    </p><p>
                        Watch for the full results on the big screen...
                    </p>
                    {!!hasResults &&
                        <p>
                            You are more caffeinated than <strong>{p}%</strong> of today's hackers.
                        </p>
                    }
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
        if (jsonEvent.messageData && jsonEvent.messageData.data) {
            var data = jsonEvent.messageData.data;
            if (jsonEvent.messageType === 'coffeeVote' && data) {
                data.width = undefined;
                this.setState(data);
            }
        }
    }

});

module.exports = CoffeePollComponent;