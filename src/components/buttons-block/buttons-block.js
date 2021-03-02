import React from 'react';
import './buttons-block.scss';

const ButtonsBlock = ({ onSelect }) => {
  return (
    <div className = 'buttons-block'>
      <button type='button'
              className='btn btn-outline-info btn-lg btn-block'
              onClick = { () => onSelect('Autoplay') }>
                Autoplay
      </button>
      <button type='button'
              className='btn btn-outline-secondary btn-lg btn-block'
              onClick = { () => onSelect('Statistics') }>
                Statistics
      </button>
      <button type='button'
              className='btn btn-outline-primary btn-lg btn-block'
              onClick = { () => onSelect('NewGame') }>
                New Game
      </button>
    </div>
  );
};

export default ButtonsBlock;
