//SeeSawComponent.jsx

var React = require("react");

var SeeSawBeam = React.createClass({

    render : function(){
        var {rotate} = this.props;

        return(
            <div className="SeeSawBeam" style={
                { transform: 'rotate(' + rotate + 'deg)' }
            }></div>);
    }
})


var SeeSawComponent = React.createClass({
    
    getInitialState: function() {
        this.props.ws.onmessage = this.onMessage;
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
        var rotation = 0;       

        if (bp > rp) {
            rotation = bp * -0.25;
        }
        if (rp > bp) {
            rotation = rp * 0.25;
        }
        return (
            <div className="SeeSawComponent">
                <h2 className="SeeSawHeading">EU Referendum Tracker</h2>
                <SeeSawBeam rotate={rotation}/>
                <div className="results">
                    <h4 className="result brexit">Brexit: {bp}%</h4>
                    <h4 className="result remain">Remain: {rp}%</h4>
                </div>
            </div>
        );
    },

    onMessage: function (event) {
        

        var jsonEvent = JSON.parse(event.data);


        console.log('got something');

        if (jsonEvent.messageType === 'brexitVote') {
            
            var newState = {
                brexit: this.state.brexit + 1,
                remain: this.state.remain
            };
            
            this.setState(newState);
        }

        if (jsonEvent.messageType === 'bremainVote') {
            
            var newState = {
                brexit: this.state.brexit,
                remain: this.state.remain + 1
            };
            
            this.setState(newState);
        }
    }

});

module.exports = SeeSawComponent;