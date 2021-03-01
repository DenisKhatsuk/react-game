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
    } = this.props;
    onSelect(row, column);
    const { isEmpty } = this.state;
    if (isEmpty) {
      this.setState({
        value,
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
