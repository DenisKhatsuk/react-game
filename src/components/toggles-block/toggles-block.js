import React, { useState } from 'react';
import './toggles-block.scss';
import Switch from 'react-switch';

const TogglesBlock = () => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const handleChange1 = (nextChecked) => {
    setChecked1(nextChecked);
  };
  const handleChange2 = (nextChecked) => {
    setChecked2(nextChecked);
  };
  return (
    <div className = 'toggles-block'>
      <label className = 'toggles-block__toggle'>
        <span>Who starts the game</span>
        <Switch
          onChange = { handleChange }
          checked = { checked }
          className = 'react-switch'
          onColor = '#86d3ff'
          onHandleColor = '#2693e6'
          offColor = '#86d3ff'
          offHandleColor = '#2693e6'
          checkedIcon = {
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#ffffff',
                paddingRight: 2,
              }}
            >
              O
            </div>
          }
        />
      </label>
      <label className = 'toggles-block__toggle'>
        <span>Night Mode</span>
        <Switch
          onChange = { handleChange1 }
          checked = { checked1 }
          className = 'react-switch'
          onColor = '#86d3ff'
          onHandleColor = '#2693e6'
        />
      </label>
      <label className = 'toggles-block__toggle'>
        <span>Fullscreen</span>
        <Switch
          onChange = { handleChange2 }
          checked = { checked2 }
          className = 'react-switch'
          onColor = '#86d3ff'
          onHandleColor = '#2693e6'
        />
      </label>
    </div>
  );
};

export default TogglesBlock;
