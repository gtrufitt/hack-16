//SeeSawComponent.jsx

var React = require("react");

var SeeSawBeam = React.createClass({
    render : function(){
        return(
            <div className="SeeSawBeam"></div>);
    }
})

var SeeSawComponent = React.createClass({

    componentDidMount: function() {
        var ws = this.props.ws;
    },

    render: function() {
        return (
            <div className="SeeSawComponent">
                <h2 className="SeeSawHeading">EU Referendum Tracker</h2>
                <SeeSawBeam/>
            </div>
        );
    }

});

module.exports = SeeSawComponent;