import React, { Component } from 'react';
import Game from './components/GameInit';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Hangman</h2>
        </div>

        <Game/>
      </div>
    );
  }
}

export default App;
