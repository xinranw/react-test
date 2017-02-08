import { connect } from 'react-redux'
import VideoPlayer from './../components/VideoPlayer'
import * as Actions from './../actions/index'


function mapStateToProps(state) {
  return { 
    source: state.video.url,
    volumeSettings: state.volumeSettings
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const toggleMute = () => {
    dispatch(Actions.toggleMute())
  }
  const setVolume = (e) => {
    const newVolume = Number(e.target.value)
    dispatch(Actions.setVolume(newVolume))
  }
  return {
    toggleMute, setVolume
  }
}

const VideoPlayerContainer = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)

export default VideoPlayerContainer