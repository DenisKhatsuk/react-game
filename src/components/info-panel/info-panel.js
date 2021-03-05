import React from 'react';
import './info-panel.scss';

const InfoPanel = ({ message }) => {
  return (
    <div className = "info-panel">
      { message }
    </div>
  );
};

export default InfoPanel;
