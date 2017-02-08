import React from 'react';

let VolumeControls = ({ volumeSettings, toggleMute, setVolume }) => {
// class VolumeControls extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     isMuted: false,
  //     volume: 1
  //   }
  // }

  // toggleMute = e => {
  //   if (this.state.isMuted){
  //     this.props.changeVolume(this.state.volume)
  //   } else {
  //     this.props.changeVolume(0)
  //   }
  //   this.setState({
  //     isMuted: !this.state.isMuted
  //   })
  // }

  // handleVolumeChange = e => {
  //   const newVolume = Number(e.target.value)
  //   this.props.changeVolume(newVolume)
  //   this.setState({
  //     volume: newVolume,
  //     isMuted: newVolume === 0
  //   })
  // }

  let volumeButtonClass
  // if (this.state.volume === 0 || this.state.isMuted){
  if (volumeSettings.volume === 0 || volumeSettings.isMuted){
    volumeButtonClass = 'fa-volume-off'
  } else if (volumeSettings.volume <= 0.5){
    volumeButtonClass = 'fa-volume-down'
  } else {
    volumeButtonClass = 'fa-volume-up'
  }

  const classes = `fa ${volumeButtonClass} player__button`
  return (
    <div className="volume-control">
      <button className={classes}
              id="volumeIcon"
              onClick={toggleMute}></button>
      <input type="range"
             name="volume"
             className="player__slider"
             id="volumeSlider"
             min="0"
             max="1"
             step="0.05"
             onChange={setVolume}/>
    </div>
  )
}

export default VolumeControls