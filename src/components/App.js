import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ClipControls from './ClipControls'
import VideoPlayerContainer from './../containers/VideoPlayerContainer'
import UploadVideo from '../containers/UploadVideo'

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <UploadVideo />
        <VideoPlayerContainer />
        <ClipControls />
      </div>
    );
  }
}

export default App