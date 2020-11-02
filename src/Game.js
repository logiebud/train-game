import React from 'react';
import './Game.css';
import Square from './Square.js';
import GameClock from './GameClock.js';

class Game extends React.Component {
  // height x width
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      playing: true,
      startTime: new Date(),
      train: this.randomPos(),
      luggage: this.randomPos(),
    }
  }

  randomPos() {
    return {
      x: parseInt(Math.random() * this.props.width),
      y: parseInt(Math.random() * this.props.height),
    }
  }

  checkTouching() {
    const {train, luggage} = this.state;
    if(train.x === luggage.x && train.y === luggage.y) {
      this.setState((state, props) => {
        return {
          score: state.score + 1,
          luggage: this.randomPos(),
        }
      });
    }
  }

  moveTrainUp() {
    if(this.state.train.y - 1 === -1) {
      return;
    }
    this.setState({
      train: {...this.state.train, y: this.state.train.y - 1}
    })
  }

  moveTrainDown() {
    if(this.state.train.y === this.props.height - 1) {
      return;
    }
    this.setState({
      train: {...this.state.train, y: this.state.train.y + 1}
    })
  }

  moveTrainLeft() {
    if(this.state.train.x - 1 === -1) {
      return;
    }
    this.setState({
      train: {...this.state.train, x: this.state.train.x - 1}
    })
  }

  moveTrainRight() {
    if(this.state.train.x === this.props.width - 1) {
      return;
    }
    this.setState({
      train: {...this.state.train, x: this.state.train.x + 1}
    })
  }

  handleKeyDown(e) {
    if(!this.state.playing) {
      return;
    }
    switch(e.key) {
      case "ArrowUp":
        e.preventDefault();
        this.moveTrainUp();
        break;
      case "ArrowDown":
        e.preventDefault();
        this.moveTrainDown();
        break;
      case "ArrowRight":
        e.preventDefault();
        this.moveTrainRight();
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.moveTrainLeft();
        break;
      default:
        break;
    }
    this.checkTouching();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  isTrainAt(x, y) {
    return this.state.train.x === x && this.state.train.y === y;
  }

  isLuggageAt(x, y) {
    return this.state.luggage.x === x && this.state.luggage.y === y;
  }

  startOver() {
    this.setState({
      score: 0,
      playing: true,
      train: this.randomPos(),
      luggage: this.randomPos(),
      startTime: new Date(),
    });
  }

  timesUp() {
    this.setState({
      playing: false,
    })
  }

  render() {
    const squares = [];
    for (let y = 0; y < this.props.height; y++) {
      for (let x = 0; x < this.props.width; x++) {
        squares.push(
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            train={this.isTrainAt(x, y)}
            luggage={this.isLuggageAt(x, y)}
          />
        )
      }
    }

    return (
      <div id="board">
        <GameClock
          startTime={this.state.startTime}
          duration={30}
          onTimeout={this.timesUp.bind(this)} />
        <span>Score: {this.state.score}</span>
        <span className="start-over" onClick={this.startOver.bind(this)}>start over</span>
        <div className="squares">
          {squares.map((square, i) => {
            if(i % this.props.width === 0) {
              return (
                <React.Fragment>
                  <br />
                  {square}
                </React.Fragment>
              )
            }
            return square;
          })}
        </div>
      </div>
    )
  }
}

export default Game;
