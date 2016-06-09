//InitialComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    componentDidMount: function() {
        console.log("The intial component mounted!!")
    },

    render: function() {
        return (
            <div className="initialComponent">
                <h2>Initial Component</h2>
            </div>
        );
    }

});

module.exports = InitialComponent;