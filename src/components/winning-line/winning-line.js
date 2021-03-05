import React from 'react';
import './winning-line.scss';

const WinningLine = ({ line: [[x1, y1], [x2, y2]], visibility }) => {
  const classes = visibility ? 'winning-line' : 'winning-line d-none';
  return (
    <svg className = { classes } height='300' width='300'>
      <line
        className = 'winning-line__line'
        x1 = { x1 }
        y1 = { y1 }
        x2 = { x2 }
        y2 = { y2 }
      ></line>
    </svg>
  );
};

export default WinningLine;
