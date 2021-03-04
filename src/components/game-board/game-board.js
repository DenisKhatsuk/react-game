import React, { Component } from 'react';
import './game-board.scss';
import ReactHowler from 'react-howler';
import BoardField from '../board-field';
import InfoPanel from '../info-panel';
import ButtonsBlock from '../buttons-block';
import TogglesBlock from '../toggles-block';
import WinningLine from '../winning-line';

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

  currentPlayer = sessionStorage.getItem('startingPlayer') || 'X';

  startingPlayer = sessionStorage.getItem('startingPlayer') || 'X';

  isNightMode = (sessionStorage.getItem('isNightMode') === 'true');

  soundIsOn = (sessionStorage.getItem('soundIsOn') === 'true');;

  playMoveSound = false;

  playEndGameSound = false;

  musicIsOn = false;

  idCounter = 0;

  winningLines = [
    [[0, 0], [0, 0]],
    [[10, 50], [290, 50]],
    [[10, 150], [290, 150]],
    [[10, 250], [290, 250]],
    [[50, 10], [50, 290]],
    [[150, 10], [150, 290]],
    [[250, 10], [250, 290]],
    [[10, 10], [290, 290]],
    [[10, 290], [290, 10]],
  ];

  winningLine = this.winningLines[0];

  drawLine = (idx) => {
    this.winningLine = this.winningLines[idx];
  }

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
    this.currentPlayer = this.startingPlayer;
  };

  toggleCurrentPlayer = () => {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  };

  toggleStartingPlayer = () => {
    this.startingPlayer = this.startingPlayer === 'O' ? 'X' : 'O';
    sessionStorage.setItem('startingPlayer', this.startingPlayer);
    this.setInitialGameState();
  };

  toggleNightModeSwitch = () => {
    this.isNightMode = !this.isNightMode;
    sessionStorage.setItem('isNightMode', this.isNightMode);
    document.getElementById('root').classList.toggle('night-mode');
  };

  toggleSoundSwitch = () => {
    this.soundIsOn = !this.soundIsOn;
    sessionStorage.setItem('soundIsOn', this.soundIsOn);
  };

  toggleMusicSwitch = () => {
    this.musicIsOn = !this.musicIsOn;
  };

  toggleSound = (sound) => {
    this[sound] = true;
    setTimeout(() => {
      this[sound] = false;
    }, 100);
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
    this.drawLine(1);
    if (this.soundIsOn) this.toggleSound('playEndGameSound');
  };

  makeMove = (row, column) => {
    this.setState(({ board }) => {
      const newBoard = [...board];
      newBoard[row][column] = this.currentPlayer;
      return {
        board: newBoard,
      };
    }, () => {
      if (this.soundIsOn) this.toggleSound('playMoveSound');
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
        this.drawLine(i + 1);
        return;
      }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        const winner = board[0][i];
        this.stopGame(winner);
        this.drawLine(i + 4);
        return;
      }
    }
    // diagonal check
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      const winner = board[0][0];
      this.stopGame(winner);
      this.drawLine(7);
      return;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      const winner = board[0][2];
      this.stopGame(winner);
      this.drawLine(8);
      return;
    }
    // Tie check
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) return;
      }
    }
    this.stopGame(null);
    this.drawLine(0);
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
            if (this.soundIsOn) this.toggleSound('playMoveSound');
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
    if (this.isNightMode) document.getElementById('root').classList.add('night-mode');
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
          <WinningLine
            line = { this.winningLine }
            visibility = { !this.state.isPlaying }
          />
          { gameBoard }
        </section>
        <section className = "game-settings">
          <TogglesBlock
            onPlayerChange = { this.toggleStartingPlayer }
            playerState = { this.startingPlayer === 'O' }
            onSoundChange = { this.toggleSoundSwitch }
            soundState = { this.soundIsOn }
            onMusicChange = { this.toggleMusicSwitch }
            musicState = { this.musicIsOn }
            onNightModeChange = { this.toggleNightModeSwitch }
            nightModeState = { this.isNightMode }
          />
          <ButtonsBlock onSelect = { this.settingsListener }/>
        </section>
        <ReactHowler
          src='./sounds/move-sound.mp3'
          playing = { this.playMoveSound }
        />
        <ReactHowler
          src='./sounds/end-game-sound.mp3'
          playing = { this.playEndGameSound }
        />
        <ReactHowler
          src='./sounds/game-music.mp3'
          loop = { true }
          playing = { this.musicIsOn }
        />
      </div>
    );
  }
}
