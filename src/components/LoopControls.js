import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions/index'
import './loopControls.css'

const Looper = ({index, isLoopSet, isPlaying, handleNewLoop, handlePlay, handleRecord}) => {
  return (
    <div className="loop-control flex flex-row w100">
      <button className="loop-control__loop-button" onClick={handlePlay} disabled={!isLoopSet}>
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-play fa-stack-1x fa-inverse"></i>
        </span>
        <span className="margin-left-1">Loop {index}</span>
      </button>
      <button className="record-button" onClick={handleRecord}>
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x record-button__outside"></i>
          <i className="fa fa-circle fa-stack-1x record-button__inside"></i>
        </span>
      </button>
    </div>
  )
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

  constructor(props){
    super(props)
    this.state = {
      numLoops: Math.max(props.loopState.loops.length, 1)
    }
  }

  handleNewLoop = () => {
    console.log('new loop')
    this.setState({
      numLoops: this.state.numLoops + 1
    })
  }

  handleRecord = (i) => {
    if (!this.props.videoState.url) {
      return
    }

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
    const numButtons = Math.max(this.props.loopState.loops.length, this.state.numLoops)

    const buttons = [...Array(numButtons).keys()].map((index) => {
      const isLoopSet = loops[index] && loops[index].start && loops[index].end
      return <Looper key={index}
                     index={index}
                     isLoopSet={isLoopSet}
                     handleNewLoop={this.handleNewLoop}
                     handlePlay={this.playLoop.bind(this, index)} 
                     handleRecord={this.handleRecord.bind(this, index)}></Looper>
    })
    return buttons
  }

  render = () => {
    const buttons = this.renderButtons()
    return (
      <div className="loop-controls-container flex flex-row w100 margin-top-2">
        <div className="flex flex-column w100">
          { buttons }
        </div>
        <button onClick={this.handleNewLoop}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopControls)
