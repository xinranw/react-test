import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <div className="player">
        <video className="player__video viewer" src=""></video>
        <div className="player__controls">
          <div className="progress">
            <div className="progress__filled"></div>
          </div>
          <button className="player__button toggle" title="Toggle Play">►</button>
          <input type="range" name="volume" className="player__slider" min="0" max="1" step="0.05" value="1"/>
          <input type="range" name="playbackRate" className="player__slider" min="0.5" max="2" step="0.1" value="1"/>
        </div>
      </div>
    );
  }
}

export default App;
