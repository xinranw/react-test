const DEFAULT_STATE = {
  url: '',
  isPaused: false,
  // isScrubbing: false,
  videoProgress: 0
}
const video = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_VIDEO_URL':
      return {
        ...state,
        url: action.videoUrl
      }
    case 'SET_VIDEO_PROGRESS':
      return {
        ...state,
        videoProgress: action.videoProgress
      }
    case 'SET_VIDEO_PLAY_STATE':
      return {
        ...state,
        isPaused: action.playState
      }
    // case 'SET_VIDEO_SCRUB_STATE':
    //   return {
    //     ...state,
    //     isScrubbing: !state.isScrubbing
    //   }
    default:
      return state
  }
}
export default video