//CoffeePollComponent.jsx

var React = require("react");
var ReactDom = require('react-dom');
var BarChart = require("react-bar-chart");

const margin = {top: 20, right: 20, bottom: 30, left: 40};

var CoffeePollComponent = React.createClass({

    getInitialState: function () {
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
        var domNode = ReactDom.findDOMNode(this);
        this.setState({width: domNode.offsetWidth});
        window.onresize = () => {
            this.setState({width: domNode.offsetWidth});
        };
    },

    render: function() {
        return (
            <div className="admin coffeePollComponent">
                <h2>Coffee Poll</h2>
                <BarChart
                    ylabel='Hackers'
                    width={this.state.width}
                    height={500}
                    margin={margin}
                    data={
                        this.state.numbers.map(i => ({text: i || "tea", value: this.state["had" + i]}))
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