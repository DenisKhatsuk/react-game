import React, { Component } from 'react';
import AppHeader from '../app-header';
import AppMain from '../app-main';
import AppFooter from '../app-footer';
import './react-game-app.scss';

export default class ReactGameApp extends Component {
  render() {
    return (
      <div className = "react-game-app">
        <AppHeader />
        <AppMain />
        <AppFooter />
      </div>
    );
  }
}
