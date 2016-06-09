//InitialComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    componentDidMount: function() {
        console.log("The initial component mounted!!")
    },

    render: function() {
        return (
            <div className="initialComponent">
                <h2>Welcome - initial component</h2>
            </div>
        );
    }

});

module.exports = InitialComponent;