var React = require("react");

var MainComponent = React.createClass({

    componentDidMount: function() {
        console.log("The main component mounted!!")
    },

    render: function() {
        return (
            <div className="reactComponentContainer">
                <h1>Welcome</h1>
                <img class="logo" src="./img/logo.jpg" alt=""/>
                <ul id="clicks"></ul>
                <button onClick={this.onButtonClick}>CLICK ME</button>
            </div>
        );
    },

    onButtonClick: function () {
        this.props.ws.send(JSON.stringify({ messageType: 'sendToAdmin', messageData: 'hello' }))
    }

});

exports.MainComponent = MainComponent;