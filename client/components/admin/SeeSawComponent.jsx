//SeeSawComponent.jsx

var React = require("react");

var SeeSawComponent = React.createClass({

    componentDidMount: function() {
        console.log("The see saw component mounted!!")
    },

    render: function() {
        return (
            <div className="seeSawComponent">
                <h2>SeeSawComponent</h2>
            </div>
        );
    }

});

module.exports = SeeSawComponent;