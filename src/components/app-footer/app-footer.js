import React from 'react';
import './app-footer.scss';
import SocialIcons from '../social-icons';
import RSschoolLogo from '../rsschool-logo';

const rsschoolLink = 'https://rs.school/react/';

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className = "app-footer__details">
        <span className = "app-footer__year">2021</span>
        <div className = "app-footer__logo">
          <a href={ rsschoolLink } target = "_blank" rel = "noreferrer">
            <RSschoolLogo />
          </a>
        </div>
      </div>
      <div className = "app-footer__icons">
        <SocialIcons />
      </div>
    </footer>
  );
};

export default AppFooter;
