import React from 'react';
import './statistics.scss';

const closeButtonText = 'Close Statistics';

const Statistics = ({ statistics, visibility, onClose }) => {
  const classes = visibility ? 'statistics' : 'statistics statistics_hidden';
  let xWins = 0;
  let oWins = 0;
  let ties = 0;
  statistics.forEach((item) => {
    switch (item) {
      case 'X':
        xWins += 1;
        break;
      case 'O':
        oWins += 1;
        break;
      default:
        ties += 1;
    }
  });

  const statisticsContent = (
    <ul className="statistics__results">
      <li className="statistics__results-item">X player wins: {xWins}</li>
      <li className="statistics__results-item">O player wins: {oWins}</li>
      <li className="statistics__results-item">Ties: {ties}</li>
    </ul>
  );

  return (
    <div className = { classes }>
      <i
        className = "fa fa-times statistics__close"
        title = { closeButtonText }
        onClick = { () => onClose() }
      ></i>
      <h1 className = "statistics__title">Game results during last 10 plays</h1>
      { statisticsContent }
    </div>
  );
};

export default Statistics;
