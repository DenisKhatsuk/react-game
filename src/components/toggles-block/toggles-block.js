import React, { useState } from 'react';
import './toggles-block.scss';
import Switch from 'react-switch';

const TogglesBlock = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  return (
    <div className = 'toggles-block'>
      <label>
        <span>Switch with default style</span>
        <Switch
          onChange = { handleChange }
          checked = { checked }
          className = 'react-switch'
          onColor = '#86d3ff'
          onHandleColor = '#2693e6'
        />
      </label>
    </div>
  );
};

export default TogglesBlock;
