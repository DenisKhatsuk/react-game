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
    isPlaying: true,
    winner: '',
  };

  currentPlayer = 'O';

  idCounter = 0;

  onSelect = (row, column) => {
    if (this.state.board[row][column]) return;
    this.setState(({ board }) => {
      const newBoard = [...board];
      newBoard[row][column] = this.currentPlayer;
      return {
        board: newBoard,
      };
    }, () => {
      this.resultCheck();
      this.toggleCurrentPlayer();
      this.props.setMessage(`It's player ${this.currentPlayer} turn.`);
    });
  };

  toggleCurrentPlayer = () => {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  };

  resultCheck = () => {
    const { board } = this.state;
    // horizontal check
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        const winner = board[0][i];
        this.stopGame(winner);
      }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        const winner = board[0][i];
        this.stopGame(winner);
      }
    }
    // diagonal check
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      const winner = board[0][0];
      this.stopGame(winner);
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      const winner = board[0][2];
      this.stopGame(winner);
    }
  };

  stopGame = (winner) => {
    this.setState({
      isPlaying: false,
      winner,
    }, () => {
      this.props.setMessage(`Player ${this.state.winner} won!`);
    });
  };

  render() {
    const { board, isPlaying } = this.state;
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
                        value = { column }
                        isPlaying = { isPlaying }/>);
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
