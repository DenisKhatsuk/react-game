import React, { Component } from 'react';
import './game-board.scss';
import BoardField from '../board-field';

export default class GameBoard extends Component {
  state = {
    board: [
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ],
  };

  currentPlayer = 'O';

  idCounter = 0;

  toggleCurrentPlayer = () => {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  };

  getCurrentPlayer = () => {
    return this.currentPlayer;
  };

  render() {
    const { board } = this.state;
    const gameBoard = board.map((row) => {
      return (
        <div
          key = { this.idCounter++ }
          className = "board-row">
            { row.map(() => {
              return (<BoardField
                        key = { this.idCounter++ }
                        onSelect = { this.toggleCurrentPlayer }
                        currentPlayer = { this.getCurrentPlayer } />);
            })
            }
        </div>
      );
    });
    return (
      <div className = "game-board">
        { gameBoard }
      </div>
    );
  }
}
