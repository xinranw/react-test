import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoPlayer from './../components/VideoPlayer'
import * as VideoHelper from './../components/VideoHelper'
import * as Actions from './../actions/index'

class VideoPlayerContainer extends Component {
  render = () => {
    return (
      <VideoPlayer
        loopState={this.props.loopState}
        videoState={this.props.videoState}
        volumeSettings={this.props.volumeSettings}
        actions={this.props.actions} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    loopState: state.loops,
    videoState: state.video,
    volumeSettings: state.volumeSettings,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const addProgressEventListeners = (progress) => {
    progress.addEventListener('mousedown', () => {
      dispatch(Actions.setVideoScrubState(true))
    })
    progress.addEventListener('mouseup', () => {
      dispatch(Actions.setVideoScrubState(false))
    })
  }

  const addVideoEventListeners = (video) => {
    video.addEventListener('click', () => {
      const method = video.paused ? 'play' : 'pause'
      video[method]()
    })
    video.addEventListener('play', (e) => {
      dispatch(Actions.setVideoPlayState(video.paused))
    })
    video.addEventListener('pause', (e) => {
      dispatch(Actions.setVideoPlayState(video.paused))
    })
    video.addEventListener('timeupdate', (e) => {
      const percent = VideoHelper.timeToPercent(video.currentTime, video.duration)
      dispatch(Actions.setVideoProgress(percent))
    })
  }

  const setVolume = e => {
    const newVolume = Number(e.target.value)
    dispatch(Actions.setVolume(newVolume))
  }

  const toggleFullscreen = video => {
    if (!video){
      return
    }

    const hasFullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen

    if (!hasFullscreenElement){
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  const togglePlay = video => {
    if (!video){
      return
    }

    const method = video.paused ? 'play' : 'pause'
    video[method]()
  }

  const actions = {
    ...bindActionCreators(Actions, dispatch),
    addProgressEventListeners,
    addVideoEventListeners,
    setVolume,
    togglePlay,
    toggleFullscreen,
  }
  return {
    actions: actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerContainer)