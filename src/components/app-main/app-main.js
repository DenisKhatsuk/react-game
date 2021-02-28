import React from 'react';
import './app-main.scss';
import GameBoard from '../game-board';

const AppMain = () => {
  return (
    <main className="app-main">
      <section className = "game-field">
        <GameBoard />
      </section>
      <section className = "game-settings"></section>
    </main>
  );
};

export default AppMain;
