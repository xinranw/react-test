import { combineReducers } from 'redux'
import video from './video'
import volumeSettings from './volumeSettings'

const videoApp = combineReducers({
  video,
  volumeSettings
})

export default videoApp