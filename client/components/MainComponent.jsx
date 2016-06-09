var React = require("react");

var MainComponent = React.createClass({

    // Just to show it's possible to manipulate DOM with JQuery inside React
    componentDidMount: function() {
        console.log("The main component mounted!!")
    },

    render: function() {
        return (
            <div className="reactComponentContainer">
                <h1>Hello {this.props.name}</h1>
                <p>This is rendered with a React JSX Component! yeah</p>
            </div>
        );
    }

});

exports.MainComponent = MainComponent;