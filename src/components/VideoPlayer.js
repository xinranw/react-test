import React, { Component } from 'react'
import VolumeControls from './VolumeControls'
import * as VideoHelper from './VideoHelper'
import './videoPlayer.css'

class VideoPlayer extends Component {

  constructor(props){
    super(props)
    this.state = {
      isScrubbing: false
    }
  }

  componentDidMount = () => {
    const progress = this.refs.progress
    progress.addEventListener('click', (e) => {
      this.scrub(e)
    })
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
    video.addEventListener('play', this.props.actions.setVideoPlayState(video.paused))
    video.addEventListener('pause', this.props.actions.setVideoPlayState(video.paused))
    video.addEventListener('timeupdate', (e) => {
      // update store video progress
      const percent = VideoHelper.timeToPercent(video.currentTime, video.duration)
      this.props.actions.setVideoProgress(percent)

      // check if loop was activated
      const currActiveLoopIndex = this.props.loopState.activeLoopIndex
      const activeLoop = this.props.loopState.loops[currActiveLoopIndex]
      const startTime = VideoHelper.percentToTime(activeLoop.start, video.duration)
      const endTime = VideoHelper.percentToTime(activeLoop.end, video.duration)
      if (video.currentTime >= endTime){
        video.currentTime = startTime
      }
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const volume = this.props.volumeSettings.isMuted ? 0 : this.props.volumeSettings.volume
    this.refs.video.volume = volume

    const prevActiveLoopIndex = prevProps.loopState.activeLoopIndex
    const currActiveLoopIndex = this.props.loopState.activeLoopIndex
    if (prevActiveLoopIndex !== currActiveLoopIndex) {
      // active loop changed, play new loop
      const video = this.refs.video
      const activeLoop = this.props.loopState.loops[currActiveLoopIndex]
      const startTime = VideoHelper.percentToTime(activeLoop.start, video.duration)
      video.currentTime = startTime
    }
  }

  setVolume = e => {
    const newVolume = Number(e.target.value)
    this.props.actions.setVolume(newVolume)
  }

  scrub = e => {
    const video = this.refs.video
    const newTime = (e.offsetX / this.refs.progress.offsetWidth) * video.duration
    video.currentTime = newTime
  }

  togglePlay = e => {
    const video = this.refs.video
    const method = video.paused ? 'play' : 'pause'
    video[method]()
  }

  render = () => {
    const buttonIcon = this.props.videoState.isPaused ? '►' : '❚ ❚';
    const videoProgressPercent = this.props.videoState.videoProgress + '%'

    const activeLoopIndex = this.props.loopState.activeLoopIndex
    const activeLoop = this.props.loopState.loops[activeLoopIndex]
    const loopStart = activeLoop ? `${activeLoop.start}%` : '0%'
    const loopEnd = activeLoop ? `${activeLoop.end}%` : '0%'

    return (
      <div className="player">
        <video className="player__video viewer"
               src={ this.props.videoState.url }
               type="video/mp4"
               autoPlay
               ref="video">
        </video>
        <div className="player__controls">
          <div className="progress"
               ref="progress">
            <i className="fa fa-caret-down fa-2x loop-marker"
               style={{left:loopStart}}></i>
            <i className="fa fa-caret-down fa-2x loop-marker"
               style={{left:loopEnd}}></i>
            <div className="progress__filled"
                 style={{flexBasis:videoProgressPercent}}>
            </div>
          </div>
          <button className="player__button toggle"
                  title="Toggle Play"
                  onClick={this.togglePlay}>
            {buttonIcon}
          </button>
          <VolumeControls volumeSettings={this.props.volumeSettings} 
                          toggleMute={this.props.actions.toggleMute}
                          setVolume={this.setVolume} />
        </div>
      </div>
      )
  }
}
export default VideoPlayer