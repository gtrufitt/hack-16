//SeeSawComponent.jsx

var React = require("react");

var SeeSawBeam = React.createClass({
    render : function(){
        return(
            <div className="SeeSawBeam"></div>);
    }
})


var SeeSawComponent = React.createClass({
    
    getInitialState: function() {
        return {
            brexit: 0,
            remain: 0
        }
    },

    componentDidMount: function() {
        console.log("The see saw component mounted!!")
    },

    render: function() {
        var {brexit, remain} = this.state;
        var p = 1/Math.max(1, brexit + remain);
        var bp = Math.round(10000 * brexit * p) / 100;
        var rp = Math.round(10000 * remain * p) / 100;
        return (
            <div className="SeeSawComponent">
                <h2 className="SeeSawHeading">EU Referendum Tracker</h2>
                <SeeSawBeam/>
                <div className="results">
                    <h4 className="result brexit">Brexit: {bp}%</h4>
                    <h4 className="result remain">Remain: {rp}%</h4>
                </div>
            </div>
        );
    }

});

module.exports = SeeSawComponent;