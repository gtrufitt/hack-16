//SeeSawComponent.jsx

var React = require("react");

var SeeSawComponent = React.createClass({

    componentDidMount: function() {
        var ws = this.props.ws;
    },

    render: function() {
        return (
            <div className="SeeSawComponent">
                <h2 className="f-header">EU Referendum</h2>
                <p className="f-bodyCopy">
                    EU Referendum 
                </p>
            </div>
        );
    }

});

module.exports = SeeSawComponent;