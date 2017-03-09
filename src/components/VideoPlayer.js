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


      this.scrub(e.offsetX, progress, video)
    })
    progress.addEventListener('mousemove', (e) => {
      if (this.props.videoState.isScrubbing) {
        this.scrub(e.offsetX, progress, video)
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

  scrub = (offsetX, progress, video) => {
    const newTime = (offsetX / progress.offsetWidth) * video.duration

    const activeLoop = this.getActiveLoop()
    if (activeLoop){
      const loopEndTime = VideoHelper.percentToTime(activeLoop.end, video.duration)
      
      if (newTime > loopEndTime){
        this.props.actions.resetActiveLoop()
      }
    }

    video.currentTime = newTime
  }

  render = () => {
    const playButtonClasses = this.props.videoState.isPaused ? 'fa fa-play' : 'fa fa-pause';
    const videoProgressPercent = this.props.videoState.videoProgress + '%'

    const activeLoop = this.getActiveLoop()
    const loopStart = activeLoop ? `${activeLoop.start}%` : '0%'
    const loopEnd = activeLoop ? `${activeLoop.end}%` : '0%'

    const hasActiveLoop = this.props.loopState.activeLoopIndex != null
    const loopMarkerClass = `fa fa-caret-down loop-marker ${hasActiveLoop ? "" : 'hidden' }`
    return (
      <div className="player">
        <video className="player__video viewer"
               src={ this.props.videoState.url }
               type="video/mp4"
               autoPlay
               ref="video">
        </video>
        <div className="player__controls left-0">
          <div className="progress"
               ref="progress">
            <i className={ loopMarkerClass }
               style={{left:loopStart}}></i>
            <i className={ loopMarkerClass }
               style={{left:loopEnd}}></i>
            <div className="progress__filled"
                 style={{flexBasis:videoProgressPercent}}>
            </div>
          </div>
          <button className="player__button toggle white bg-none margin-0 padding-0 border-0 outline-0 "
                  title="Toggle Play"
                  onClick={this.props.actions.togglePlay.bind(this, this.refs.video)}>
            <i className={playButtonClasses}></i>
          </button>
          <VolumeControls volumeSettings={this.props.volumeSettings} 
                          toggleMute={this.props.actions.toggleMute}
                          setVolume={this.props.actions.setVolume} />
          <button className="player__button white bg-none margin-0 padding-0 border-0 outline-0"
                  onClick={this.props.actions.toggleFullscreen.bind(this, this.refs.video)}>
            <i className="fa fa-arrows-alt"></i>
          </button>
        </div>
      </div>
      )
  }
}
export default VideoPlayer