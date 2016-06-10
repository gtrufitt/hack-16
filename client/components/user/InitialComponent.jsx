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