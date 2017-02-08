import { connect } from 'react-redux'
import VideoPlayer from './../components/VideoPlayer'

function mapStateToProps(state) {
  return { source: state.video.url }
}

const VideoPlayerContainer = connect(mapStateToProps)(VideoPlayer)

export default VideoPlayerContainer