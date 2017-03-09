export const setVideoUrl = (videoUrl) => ({
  type: 'SET_VIDEO_URL',
  videoUrl
})
export const setVideoPlayState = (playState) => ({
  type: 'SET_VIDEO_PLAY_STATE',
  playState
})
export const setVideoProgress = (videoProgress) => ({
  type: 'SET_VIDEO_PROGRESS',
  videoProgress
})
export const setVideoScrubState = (isScrubbing) => ({
  type: 'SET_VIDEO_SCRUB_STATE',
  isScrubbing
})

export const setVideoFullscreenState = (isFullscreen) => ({
  type: 'SET_VIDEO_FULLSCREEN_STATE',
  isFullscreen
})

export const setVolume = (volume) => ({
  type: 'SET_VOLUME',
  volume
})
export const toggleMute = () => ({
  type: 'TOGGLE_MUTE'
})


export const startLoop = (index, time) => ({
  type: 'START_LOOP',
  index,
  time
})
export const endLoop = (index, time) => ({
  type: 'END_LOOP',
  index,
  time
})
export const selectLoop = (index) => ({
  type: 'SELECT_LOOP',
  index
})
export const getActiveLoop = () => ({
  type: 'GET_ACTIVE_LOOP'
})
export const resetActiveLoop = () => ({
  type: 'RESET_ACTIVE_LOOP'
})