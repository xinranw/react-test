const volumeSettings = (state = {volume: 1, isMuted: false}, action) => {
  switch (action.type) {
    case 'SET_VIDEO_URL':
      return {
        ...state,
        url: action.videoUrl
      }
    case 'SET_VOLUME':
      const volume = action.volume
      return {
        ...state,
        volume: action.volume,
        isMuted: volume === 0
      }
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted
      }
    default:
      return state
  }
}
export default volumeSettings