import React, { useState } from 'react';
import './app-main.scss';
import GameBoard from '../game-board';
import InfoPanel from '../info-panel';

const AppMain = () => {
  const [message, setMessage] = useState('Start the game!');

  return (
    <main className="app-main">
      <section className = "game-field">
        <InfoPanel message = { message }/>
        <GameBoard setMessage = { setMessage }/>
      </section>
      <section className = "game-settings"></section>
    </main>
  );
};

export default AppMain;
