import React, { Component } from 'react';
import './videoPlayer.css';

class VideoPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoProgress: 0, // percent
      videoPaused: true,
      isScrubbing: false,
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps)
  }

  componentDidMount = () => {
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

  changeVolume = newValue => {
    this.refs.video.volume = newValue
  }

  render = () => {    
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
                  onClick={this.togglePlay}>
              {buttonIcon}
          </button>
          <VolumeControl changeVolume={this.changeVolume}/>
        </div>
      </div>
    )
  }
}

class VolumeControl extends Component {
  constructor(props){
    super(props)
    this.state = {
      isMuted: false,
      volume: 1
    }
  }

  toggleMute = e => {
    if (this.state.isMuted){
      this.props.changeVolume(this.state.volume)
    } else {
      this.props.changeVolume(0)
    }
    this.setState({
      isMuted: !this.state.isMuted
    })
  }

  handleVolumeChange = e => {
    const newVolume = Number(e.target.value)
    this.props.changeVolume(newVolume)
    this.setState({
      volume: newVolume,
      isMuted: newVolume === 0
    })
  }

  render(){
    let volumeButtonClass
    if (this.state.volume === 0 || this.state.isMuted){
      volumeButtonClass = 'fa-volume-off'
    } else if (this.state.volume <= 0.5){
      volumeButtonClass = 'fa-volume-down'
    } else {
      volumeButtonClass = 'fa-volume-up'
    }

    const classes = `fa ${volumeButtonClass} player__button`
    return (
      <div className="volume-control">
        <button className={classes}
                id="volumeIcon"
                onClick={this.toggleMute}></button>
        <input type="range"
               name="volume"
               className="player__slider"
               id="volumeSlider"
               min="0"
               max="1"
               step="0.05"
               onChange={this.handleVolumeChange}/>
      </div>
    )
  }
}

export default VideoPlayer;
