import React, { Component } from 'react'
import VolumeControls from './VolumeControls'
import * as VideoHelper from './VideoHelper'
import './videoPlayer.css'

class VideoPlayer extends Component {

  componentDidMount = () => {
    const progress = this.refs.progress
    const video = this.refs.video

    this.props.actions.addProgressEventListeners(progress)
    progress.addEventListener('click', (e) => {
      this.props.actions.scrub(e.offsetX, progress, video)
    })
    progress.addEventListener('mousemove', (e) => {
      if (this.props.videoState.isScrubbing) {
        this.props.actions.scrub(e.offsetX, progress, video)
      }
    })

    this.props.actions.addVideoEventListeners(video)
    video.addEventListener('timeupdate', (e) => {
      const activeLoop = this.getActiveLoop()
      if (activeLoop){
        const startTime = VideoHelper.percentToTime(activeLoop.start, video.duration)
        const endTime = VideoHelper.percentToTime(activeLoop.end, video.duration)
        if (video.currentTime >= endTime){
          video.currentTime = startTime
        }
      }
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const video = this.refs.video

    const volume = this.props.volumeSettings.isMuted ? 0 : this.props.volumeSettings.volume
    this.refs.video.volume = volume

    const prevActiveLoopIndex = prevProps.loopState.activeLoopIndex
    const currActiveLoopIndex = this.props.loopState.activeLoopIndex
    if (currActiveLoopIndex && prevActiveLoopIndex !== currActiveLoopIndex) {
      // active loop changed, play new loop
      const activeLoop = this.getActiveLoop()
      const startTime = VideoHelper.percentToTime(activeLoop.start, video.duration)
      video.currentTime = startTime
    }
  }

  getActiveLoop = () => {
    const activeLoopIndex = this.props.loopState.activeLoopIndex
    if (activeLoopIndex != null) {
      const activeLoop = this.props.loopState.loops[activeLoopIndex]
      return activeLoop
    }
    return null
  }

  render = () => {
    const buttonIcon = this.props.videoState.isPaused ? '►' : '❚ ❚';
    const videoProgressPercent = this.props.videoState.videoProgress + '%'

    const activeLoop = this.getActiveLoop()
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
                  onClick={this.props.actions.togglePlay.bind(this, this.refs.video)}>
            {buttonIcon}
          </button>
          <VolumeControls volumeSettings={this.props.volumeSettings} 
                          toggleMute={this.props.actions.toggleMute}
                          setVolume={this.props.actions.setVolume} />
        </div>
      </div>
      )
  }
}
export default VideoPlayer