
//CoffeePollComponent.jsx

var React = require("react");

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
                <h2>User Coffee Poll</h2>
                {this.state.buttons.map((_, i)=> (
                    <button onClick={this.onButtonClick.bind(this, i)}>{i}</button>
                ))}
            </div>
        );
    }

});

module.exports = CoffeePollComponent;