//CoffeePollComponent.jsx

var React = require("react");
var BarChart = require("react-bar-chart");

var CoffeePollComponent = React.createClass({

    getInitialState: function () {
        var numbers = [0,1,2,3,4,5,6,7];
        var state = {numbers};
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
        return (
            <div className="coffeePollComponent">
                <h2>Coffee Poll</h2>
                <BarChart
                    ylabel='Hackers'
                    width={this.state.width}
                    height={500}
                    width={500}
                    data={
                        this.state.numbers.map(i => ({text: ""+i, value: this.state["had" + i]}))
                    }
                />
            </div>
        );
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