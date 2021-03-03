import React, { Component } from 'react';
import './game-board.scss';
import BoardField from '../board-field';
import InfoPanel from '../info-panel';
import ButtonsBlock from '../buttons-block';
import TogglesBlock from '../toggles-block';

export default class GameBoard extends Component {
  state = {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    isPlaying: true,
    winner: '',
    message: 'Let\'s play!',
  };

  currentPlayer = 'X';

  idCounter = 0;

  setInitialGameState = () => {
    this.setState({
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      isPlaying: true,
      winner: '',
      message: 'Let\'s play!',
    });
    this.currentPlayer = 'X';
  };

  toggleCurrentPlayer = () => {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  };

  stopGame = (winner) => {
    const winMessage = `Player ${winner} won!`;
    const tieMessage = 'Tie!';
    this.setState({
      isPlaying: false,
      winner,
    }, () => {
      this.setState({
        message: winner ? winMessage : tieMessage,
      });
    });
  };

  makeMove = (row, column) => {
    this.setState(({ board }) => {
      const newBoard = [...board];
      newBoard[row][column] = this.currentPlayer;
      return {
        board: newBoard,
      };
    }, () => {
      this.resultCheck();
      this.toggleCurrentPlayer();
      this.setState({
        message: `It's player ${this.currentPlayer} turn.`,
      });
    });
  };

  resultCheck = () => {
    const { board } = this.state;
    // horizontal check
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        const winner = board[i][0];
        this.stopGame(winner);
        return;
      }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        const winner = board[0][i];
        this.stopGame(winner);
        return;
      }
    }
    // diagonal check
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      const winner = board[0][0];
      this.stopGame(winner);
      return;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      const winner = board[0][2];
      this.stopGame(winner);
      return;
    }
    // Tie check
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) return;
      }
    }
    this.stopGame(null);
  };

  autoplay = () => {
    this.setState({
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      isPlaying: true,
      winner: '',
      message: 'Let\'s play!',
    }, () => {
      const availableFields = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          availableFields.push([i, j]);
        }
      }
      const makeRandomMove = () => {
        if (this.state.isPlaying) {
          const randomIndex = Math.floor(Math.random() * (availableFields.length + 1));
          const [randomField] = availableFields.splice(randomIndex - 1, 1);
          const [row, column] = randomField;
          this.setState(({ board }) => {
            const newBoard = [...board];
            newBoard[row][column] = this.currentPlayer;
            return {
              board: newBoard,
            };
          }, () => {
            this.resultCheck();
            this.toggleCurrentPlayer();
            this.setState({
              message: `It's player ${this.currentPlayer} turn.`,
            });
            if (availableFields.length) setTimeout(makeRandomMove, 1000);
          });
        }
      };
      makeRandomMove();
    });
  };

  onSelect = (row, column) => {
    if (this.state.board[row][column]) return;
    this.makeMove(row, column);
  };

  settingsListener = (button) => {
    switch (button) {
      case 'Autoplay':
        this.autoplay();
        break;
      case 'Statistics':
        break;
      case 'NewGame':
        this.setInitialGameState();
        break;
      default:
        break;
    }
  };

  render() {
    this.settingsListener();
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
        <section className = "game-field">
          <InfoPanel message = { this.state.message }/>
          { gameBoard }
        </section>
        <section className = "game-settings">
          <TogglesBlock />
          <ButtonsBlock onSelect = { this.settingsListener }/>
        </section>
      </div>
    );
  }
}
