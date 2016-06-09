
//CoffeePollComponent.jsx

var React = require("react");

var CoffeePollComponent = React.createClass({

    componentDidMount: function() {
        console.log("The coffee poll component mounted!!")
    },

    render: function() {
        return (
            <div className="coffeePollComponent">
                <h2>User Coffee Poll</h2>
            </div>
        );
    }

});

module.exports = CoffeePollComponent;