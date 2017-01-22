import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoProgress: 0, // percent
      videoPaused: true,
      isScrubbing: false,
    }
  }

  componentDidMount(){
    const progress = this.refs.progress
    progress.addEventListener('click', this.scrub)
    progress.addEventListener('mousemove', (e) => this.state.isScrubbing && this.scrub(e))
    progress.addEventListener('mousedown', () => {
      this.setState({
        isScrubbing: true
      })
    })
    progress.addEventListener('mouseup', () => {
      this.setState({
        isScrubbing: false
      })
    })

    const video = this.refs.video
    video.addEventListener('click', this.togglePlay)
    video.addEventListener('play', this.updateVideoState)
    video.addEventListener('pause', this.updateVideoState)
    video.addEventListener('timeupdate', this.handleProgress)
  }

  togglePlay = e => {
    const video = this.refs.video
    const method = video.paused ? 'play' : 'pause'
    video[method]()
  }

  handleProgress = e => {
    const video = this.refs.video
    const percent = (video.currentTime / video.duration) * 100
    this.setState({
      videoProgress: percent
    })
  }

  updateVideoState = e => {
    const video = this.refs.video
    this.setState({
      videoPaused: video.paused
    })
  }

  scrub = e => {
    const video = this.refs.video
    const newTime = (e.offsetX / this.refs.progress.offsetWidth) * video.duration
    video.currentTime = newTime
  }

  updateVolume = e => {
    this.refs.video.volume = e.target.value
  }

  render() {
    const buttonIcon = this.state.videoPaused ? '►' : '❚ ❚';
    const videoProgressPercent = this.state.videoProgress + '%'
    return (
      <div className="player">
        <video ref="video"
               className="player__video viewer"
               src={this.props.source}
               type="video/mp4"
               autoPlay>
        </video>
        <div className="player__controls">
          <div className="progress"
            ref="progress">
            <div className="progress__filled"
                 style={{flexBasis:videoProgressPercent}}>
            </div>
          </div>
          <button className="player__button toggle"
                  title="Toggle Play"
                  onClick={this.togglePlay}>{buttonIcon}</button>
          <input type="range"
                 name="volume"
                 className="player__slider"
                 min="0"
                 max="1"
                 step="0.05"
                 onChange={this.updateVolume}/>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
