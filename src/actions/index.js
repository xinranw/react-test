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
// export const setVideoScrubState = (isScrubbing) => ({
//   type: 'SET_VIDEO_SCRUB_STATE',
//   isScrubbing
// })

export const setVolume = (volume) => ({
  type: 'SET_VOLUME',
  volume
})
export const toggleMute = () => ({
  type: 'TOGGLE_MUTE'
})