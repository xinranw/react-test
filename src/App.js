import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import VideoPlayer from './VideoPlayer'
import ClipControls from './ClipControls'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoUrl: ""
    }
  }

  handleFileUpload = e => {
    const file = e.target.files[0]
    const type = file.type

    const fileURL = URL.createObjectURL(file)
    this.setState({
      videoUrl: fileURL
    })
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="uploadVideo" className="ui labeled icon button">
          <i className="icon upload"></i>
            Upload Video
        </label>
        <input id="uploadVideo"
               className="input-file"
               type="file"
               accept="video/*"
               onChange={this.handleFileUpload}/>
        <VideoPlayer source={this.state.videoUrl}/>
        <ClipControls />
      </div>
    );
  }
}

export default App;
