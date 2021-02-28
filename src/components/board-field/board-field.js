import React, { Component } from 'react';
import './board-field.scss';

export default class BoardField extends Component {
  state = {
    isEmpty: true,
    value: '',
  };

  clickHandler = () => {
    const { isEmpty } = this.state;
    const { currentPlayer, onSelect } = this.props;
    const player = currentPlayer();
    onSelect();
    if (isEmpty) {
      this.setState({
        value: player,
        isEmpty: false,
      });
    }
  };

  render() {
    return (
      <div
        className = "board-field"
        onClick = { this.clickHandler }>
          <span>{ this.state.value }</span>
      </div>
    );
  }
}
