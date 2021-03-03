import React, { useState } from 'react';
import './toggles-block.scss';
import Switch from 'react-switch';

const TogglesBlock = ({ onPlayerChange, playerState }) => {
  const [playerChecked, setPlayerChecked] = useState(playerState);
  const [nightModeChecked, setNightModeChecked] = useState(false);
  const [fullscreenChecked, setFullscreenChecked] = useState(false);

  const handlePlayerChange = (nextChecked) => {
    setPlayerChecked(nextChecked);
    onPlayerChange();
  };

  const handleNightModeChange = (nextChecked) => {
    setNightModeChecked(nextChecked);
    document.getElementById('root').classList.toggle('night-mode');
  };

  const launchFullScreen = (element) => {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  };

  const cancelFullscreen = () => {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  };

  const handleFullscreenChange = (nextChecked) => {
    setFullscreenChecked(nextChecked);
    if (!fullscreenChecked) {
      launchFullScreen(document.getElementById('root'));
    } else {
      cancelFullscreen();
    }
  };

  return (
    <div className = 'toggles-block'>
      <label className = 'toggles-block__toggle'>
        <span>First player</span>
        <Switch
          onChange = { handlePlayerChange }
          checked = { playerChecked }
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
          onChange = { handleNightModeChange }
          checked = { nightModeChecked }
          className = 'react-switch'
          onColor = '#86d3ff'
          onHandleColor = '#2693e6'
        />
      </label>
      <label className = 'toggles-block__toggle'>
        <span>Fullscreen</span>
        <Switch
          onChange = { handleFullscreenChange }
          checked = { fullscreenChecked }
          className = 'react-switch'
          onColor = '#86d3ff'
          onHandleColor = '#2693e6'
        />
      </label>
    </div>
  );
};

export default TogglesBlock;
