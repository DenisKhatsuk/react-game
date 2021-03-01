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
      this.resultCheck();
      return newBoard;
    });
    this.toggleCurrentPlayer();
  };

  toggleCurrentPlayer = () => {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  };

  resultCheck = () => {
    const { board } = this.state;
    // horizontal check
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        console.log(`${board[0][i]} is a winner`);
      }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        console.log(`${board[0][i]} is a winner`);
      }
    }
    // diagonal check
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) console.log(`${board[0][0]} is a winner`);
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) console.log(`${board[0][2]} is a winner`);
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
