import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoPlayer from './../components/VideoPlayer'
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
  const actions = {
    ...bindActionCreators(Actions, dispatch),
  }
  return {
    actions: actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerContainer)