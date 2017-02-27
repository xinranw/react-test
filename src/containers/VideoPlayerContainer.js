import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoPlayer from './../components/VideoPlayer'
import * as Actions from './../actions/index'

class VideoPlayerContainer extends Component {
  render = () => {
    return (
      <VideoPlayer
        videoState={this.props.videoState}
        volumeSettings={this.props.volumeSettings}
        actions={this.props.actions} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    videoState: state.video,
    volumeSettings: state.volumeSettings
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const setVolume = (e) => {
    const newVolume = Number(e.target.value)
    dispatch(Actions.setVolume(newVolume))
  }
  const updateProgress = (e) => {
    const video = e.target
    const percent = (video.currentTime / video.duration) * 100
    dispatch(Actions.setVideoProgress(percent))
  }
  const actions = {
    ...bindActionCreators(Actions, dispatch),
    setVolume,
    updateProgress,
  }
  return {
    actions: actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerContainer)