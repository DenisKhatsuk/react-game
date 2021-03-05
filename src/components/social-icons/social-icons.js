import React from 'react';
import './social-icons.scss';

const githubLink = 'https://github.com/DenisKhatsuk';
const youtubeLink = 'https://youtu.be/ngOLVOYv8JI';

const SocialIcons = () => {
  return (
    <div className = "social-icons">
      <a href={ githubLink } target = "_blank" rel = "noreferrer">
        <i className = "fa fa-github fa-3x"></i>
      </a>
      <a href={ youtubeLink } target = "_blank" rel = "noreferrer">
        <i className = "fa fa-youtube fa-3x"></i>
      </a>
    </div>
  );
};

export default SocialIcons;
