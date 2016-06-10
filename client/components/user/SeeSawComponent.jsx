//SeeSawComponent.jsx

var React = require("react");

var comms = require("../../utils/comms-client")();

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
                <p className="f-bodyHeading seesaw-label">How will you vote?</p>
                <button className="user-button user-button--brexit f-sans" onClick={this.voteBrexit}>Brexit Baby!</button>
                <button className="user-button user-button--bremain f-sans" onClick={this.voteBremain}>Bremain Bruv!</button>
                <SeeSawBeam/>
            </div>
        );
    },

    voteBremain: function() {
        comms.sendAMessage({
            messageType: 'sendToAdmin',
            messageData: {
                messageType: 'bremainVote',
                messageData: {}
            }
        });
    },

    voteBrexit: function() {
        comms.sendAMessage({
            messageType: 'sendToAdmin',
            messageData: {
                messageType: 'brexitVote',
                messageData: {}
            }
        });
    }

});

module.exports = SeeSawComponent;