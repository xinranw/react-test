const video = (state = {url: ''}, action) => {
  switch (action.type) {
    case 'SET_VIDEO_URL':
      return Object.assign({}, state, {
        url: action.videoUrl
      })
    default:
      return state
  }
}
export default video