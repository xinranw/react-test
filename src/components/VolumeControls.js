import React from 'react';

const VolumeControls = ({ volumeSettings, toggleMute, setVolume }) => {
  let volumeButtonClass
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