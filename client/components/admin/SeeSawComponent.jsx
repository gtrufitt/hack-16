//SeeSawComponent.jsx

var React = require("react");

var SeeSawComponent = React.createClass({

    componentDidMount: function() {
        console.log("The see saw component mounted!!")
    },

    render: function() {
        return (
            <div className="SeeSawComponent">
                <h2 className="SeeSawHeading">EU Referendum Tracker</h2>
            </div>
        );
    }

});

module.exports = SeeSawComponent;