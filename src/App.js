import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import VideoPlayer from './VideoPlayer'

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
        <label htmlFor="upload-video">Upload Video</label>
        <input id="upload-video"
               type="file"
               accept="video/*"
               onChange={this.handleFileUpload}
               style={{display:'none'}}/>
        <VideoPlayer source={this.state.videoUrl}/>
      </div>
    );
  }
}

export default App;
