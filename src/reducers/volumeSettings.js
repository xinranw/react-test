const DEFAULT_STATE = {
  volume: 1, 
  isMuted: false
}

const volumeSettings = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
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