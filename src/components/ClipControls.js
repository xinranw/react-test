import React, { Component } from 'react';

class MarkerButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      start: 0,
      end: 0
    }
  }

  render(){
    return (
      <button onClick={this.state.handlePress}>{this.props.number}</button>
    )
  }
}


class ClipControls extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  handlePress = (e) => {
    console.log(e)
  }

  renderButtons(){
    const buttons = [...Array(10).keys()].slice(1).map((num) => {
      return <MarkerButton number={num} handlePress={this.handlePress}></MarkerButton>
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

export default ClipControls;
