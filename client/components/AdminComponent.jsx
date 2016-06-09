var React = require("react");

var AdminComponent = React.createClass({

    getInitialState: function () {
        return {
            count: 0,
            clicks: []
        }
    },

    componentDidMount: function() {
        this.props.ws.onmessage = this.onMessage;
    },

    render: function() {
        return (
            <div className="reactComponentContainer">
                <h1 className="f-header">Admin</h1>
                <div className="count">{this.state.count}</div>
                <ul id="clicks">{
                    this.state.clicks.map((click, i) => <p key={i}>{click}</p>)
                }</ul>
                <button className="f-headline" onClick={this.onButtonClick}>CLICK ME</button>
            </div>
        );
    },

    onButtonClick: function () {
        this.props.ws.send(JSON.stringify({ messageType: 'showOnAll', messageData: 'hello' }))
    },

    onMessage: function (event) {
        var jsonEvent = JSON.parse(event.data);
        console.log(jsonEvent);
        if (jsonEvent.messageType === 'log') {
            this.setState({
                count: this.state.count + 1
            });
        }

        if (jsonEvent.messageType === 'showOnAll') {
            var message = 'SOMEONE CLICKED: ' + jsonEvent.messageData;
            var clicks = this.state.clicks.slice(0);
            clicks.push(message);
            this.setState({clicks});
        }
    }

});

exports.AdminComponent = AdminComponent;