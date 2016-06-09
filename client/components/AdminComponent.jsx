var React = require("react");

var AdminComponent = React.createClass({

    componentDidMount: function() {
        console.log("The admin component mounted!!")
    },

    render: function() {
        return (
            <div className="reactComponentContainer">
                <h1 className="f-header">Admin</h1>
                <ul id="clicks"></ul>
                <button className="f-headline" onClick={this.onButtonClick}>CLICK ME</button>
            </div>
        );
    },

    onButtonClick: function () {
        this.props.ws.send(JSON.stringify({ messageType: 'showOnAll', messageData: 'hello' }))
    }

});

exports.AdminComponent = AdminComponent;