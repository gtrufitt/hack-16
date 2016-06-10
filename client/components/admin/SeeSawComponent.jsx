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
        console.log("The see saw component mounted!!")
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