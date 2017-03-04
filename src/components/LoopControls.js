import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions/index'
import './loopControls.css'

class LoopButton extends Component {
  render(){
    return (
      <div>
        <button className="fa-lg" onClick={this.props.playLoop} disabled={!this.props.isLoopSet}>Loop {this.props.index}</button>
        <button className="record-button" onClick={this.props.handleRecord}>
          <span className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x record-button__outside"></i>
            <i className="fa fa-circle fa-stack-1x record-button__inside"></i>
          </span>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    videoState: state.video,
    loopState: state.loops,
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

class LoopControls extends Component {

  handleRecord = (i) => {
    const loops = this.props.loopState.loops
    const isAnotherLoopRecording = loops.filter((loop) => {
      return loop.isRecording && loop.index !== i
    }).length > 0

    if (isAnotherLoopRecording) {
      console.log('already recording another loop')
      return
    }

    const videoProgress = this.props.videoState.videoProgress
    if (loops[i] && loops[i].isRecording) {
      this.props.actions.endLoop(i, videoProgress)
    } else {
      this.props.actions.startLoop(i, videoProgress)
    }
  }

  playLoop = (i) => {
    this.props.actions.selectLoop(i)
  }

  renderButtons = () => {
    const loops = this.props.loopState.loops
    const buttons = [...Array(10).keys()].slice(1).map((i) => {
      const index = i-1
      const isLoopSet = loops[index] && loops[index].start && loops[index].end
      return <LoopButton key={index}
                         index={index}
                         isLoopSet={isLoopSet}
                         playLoop={this.playLoop.bind(this, index)} 
                         handleRecord={this.handleRecord.bind(this, index)}></LoopButton>
    })
    return buttons
  }

  render = () => {
    const buttons = this.renderButtons()
    return (
      <div className="">
        { buttons }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopControls)
