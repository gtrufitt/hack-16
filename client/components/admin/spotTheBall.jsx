//SpotTheBallComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    getInitialState: function () {
        return {
            points: [{
                x: 50,
                y: 50
            }]
        }
    },

    componentDidMount: function() {
        console.log("The spot the ball component mounted!!")
        this.props.ws.onmessage = this.onMessage;
    },

    render: function() {
        return (
            <div className="spotTheBallComponent c-stb">
                {this.state.points.map((co, i)=> (
                    <span className="c-stb--point" key={i} style={{ top: co.y + '%', left: co.x + '%' }}></span>
                ))}
                <img src="./img/spot-the-ball.jpg" alt="" ref="spotImage" className="c-stb--image"/>
            </div>
        );
    },

    onMessage: function (event) {
        console.log('spot the ball')
        console.log(event)
        var jsonEvent = JSON.parse(event.data);

        if (jsonEvent.messageType === 'stbClick') {
            var co = jsonEvent.messageData;
            var newState = this.state;
            newState.points.push({ x: co.x, y: co.y});
            this.setState(newState);
        }
    }

});

module.exports = InitialComponent;