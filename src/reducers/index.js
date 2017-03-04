import { combineReducers } from 'redux'
import video from './video'
import volumeSettings from './volumeSettings'
import loops from './loops'

const videoApp = combineReducers({
  loops,
  video,
  volumeSettings
})

export default videoApp