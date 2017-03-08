import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import LoopControls from './LoopControls'
import VideoPlayerContainer from './../containers/VideoPlayerContainer'
import UploadVideo from '../containers/UploadVideo'

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <div className="loop-player-container">
          <UploadVideo />
          <VideoPlayerContainer />
          <LoopControls />
        </div>
      </div>
    );
  }
}

export default App