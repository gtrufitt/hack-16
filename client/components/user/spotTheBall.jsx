//SpotTheBallComponent.jsx

var React = require("react");

var InitialComponent = React.createClass({

    componentDidMount: function() {
        var ws = this.props.ws;


    },

    render: function() {
        return (
            <div className="spotTheBallComponent c-stb">
                <h2 className="f-header">Spot the ball!</h2>
                <img src="./img/spot-the-ball.jpg" alt="" className="c-stb--image" ref="spotImage" onClick={this.onButtonClick}/>
                <p className="f-bodyCopy">
                    Where's the ball?! Nobody knows! Click the screen and see how it goes!
                </p>
            </div>
        );
    },

    getImageSize: function(){
        var image = this.refs.spotImage;
        return image.getBoundingClientRect();
    },

    getPercentage: function (coObj) {
        return {
            x: (coObj.x / this.getImageSize().width) * 100,
            y: (coObj.y / this.getImageSize().height) * 100
        }
    },

    onButtonClick (evt) {
        var e = evt.target;
        var dim = e.getBoundingClientRect();
        var x = evt.clientX - dim.left;
        var y = evt.clientY - dim.top;
        var percentageObj = this.getPercentage({
            x: x,
            y: y
        });

        this.props.ws.send(JSON.stringify({
            messageType: 'sendToAdmin',
            messageData: {
                messageType: 'stbClick',
                messageData: percentageObj
            }
        }))
    }


});

module.exports = InitialComponent;