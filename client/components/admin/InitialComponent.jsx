//InitialComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    componentDidMount: function() {
        console.log("The intial component mounted!!")
    },

    render: function() {
        return (
            <div className="initialComponent">
                <h1>Welcome to the Guardian4Real(time) demo!</h1>
                <h2 className="huge">GO HERE NOW: http://bit.ly/hack4rt</h2>
                <h2>Phone or laptop</h2>
                <h2>Real time participation!</h2>
                <h2>Instant Feedback!</h2>
                <h2>See other users!</h2>
                <p>This demo uses Websockets - A protocol providing full-duplex communication, standardised in 2011.</p>
            </div>
        );
    }

});

module.exports = InitialComponent;