import './Square.css';
import React from 'react';

class Square extends React.Component {
  render() {
    let display = ' ';
    if(this.props.train) {
      display = '🚂'
    } else if(this.props.luggage) {
      display = '💼'
    }

    return (
      <span className="square">
        {display}
      </span>
    );
  }
}

export default Square;
