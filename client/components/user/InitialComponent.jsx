//InitialComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    componentDidMount: function() {
        console.log("The initial component mounted!!")
    },

    render: function() {
        return (
            <div className="initialComponent">
                <h2 className="f-header">Welcome</h2>
                <p className="f-bodyCopy">
                    You have successfully connected! 
                </p>
                <p className="f-bodyCopy">
                    Waiting for the next activity...
                </p>
            </div>
        );
    }

});

module.exports = InitialComponent;