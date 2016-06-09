//InitialComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    componentDidMount: function() {
        var ws = this.props.ws;

        // This should fire from the connection event, not dodgy timeout
         setTimeout(function(){
             ws.send(JSON.stringify({
                 messageType: 'sendToAdmin',
                 messageData: {
                     messageType: 'userConnected'
                 }
             }));
         }, 1000);

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