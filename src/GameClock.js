import React from 'react';

class GameClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    }
  }

  tick() {
    this.setState({
      currentTime: new Date(),
    })
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick();
      if(this.timeLeft() <= 0) {
        this.props.onTimeout();
      }
    }, 1000);
  }

  timeLeft() {
    const secondsElapsed = parseInt((this.state.currentTime - this.props.startTime) / 1000);
    const timeLeft = this.props.duration - secondsElapsed;
    if(timeLeft > 0) {
      return timeLeft
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div>
        Time remaining: {this.timeLeft()}
      </div>
    )
  }
}

export default GameClock;
