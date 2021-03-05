import React, { Component } from 'react';
import './board-field.scss';

export default class BoardField extends Component {
  state = {
    value: this.props.value,
    isEmpty: true,
  };

  clickHandler = () => {
    const {
      onSelect,
      row,
      column,
      value,
      isPlaying,
    } = this.props;
    const { isEmpty } = this.state;
    if (isPlaying && isEmpty) {
      this.setState({
        value,
        isEmpty: false,
      });
      onSelect(row, column);
    }
  };

  render() {
    return (
      <div
        className = "board-field"
        onClick = { this.clickHandler }>
          { this.state.value }
      </div>
    );
  }
}
