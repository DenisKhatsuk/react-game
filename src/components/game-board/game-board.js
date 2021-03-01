import React, { Component } from 'react';
import './game-board.scss';
import BoardField from '../board-field';

export default class GameBoard extends Component {
  state = {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  };

  currentPlayer = 'O';

  idCounter = 0;

  onSelect = (row, column) => {
    if (this.state.board[row][column]) return;
    this.setState(({ board }) => {
      const newBoard = [...board];
      newBoard[row][column] = this.currentPlayer;
      return newBoard;
    });
    this.toggleCurrentPlayer();
  };

  toggleCurrentPlayer = () => {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  };

  render() {
    const { board } = this.state;
    const gameBoard = board.map((row, rowIndex) => {
      return (
        <div
        key = { this.idCounter++ }
        className = "board-row">
            { row.map((column, columnIndex) => {
              return (<BoardField
                        key = { this.idCounter++ }
                        row = { rowIndex }
                        column = { columnIndex }
                        onSelect = { this.onSelect }
                        value = { column } />);
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
