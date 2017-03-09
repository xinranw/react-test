const DEFAULT_STATE = {
  loops: [],
  activeLoopIndex: null,
}
const loops = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'START_LOOP':
      const newLoop = {
        index: action.index,
        start: action.time,
        end: null,
        isRecording: true
      }
      return {
        ...state,
        loops: state.loops.slice(0, action.index)
          .concat([{
            ...newLoop
          }])
          .concat(state.loops.slice(action.index + 1))
      }
    case 'END_LOOP':
      const selectedLoop = state.loops[action.index]
      const updatedLoop = {
        ...selectedLoop,
        end: action.time,
        isRecording: false
      }
      return {
        ...state,
        loops: state.loops.slice(0, action.index)
          .concat([{
            ...updatedLoop
          }])
          .concat(state.loops.slice(action.index + 1))
      }
    case 'SELECT_LOOP':
      return {
        ...state,
        activeLoopIndex: action.index
      }
    case 'RESET_ACTIVE_LOOP':
      return {
        ...state,
        activeLoopIndex: null
      }
    default:
      return state
  }
}
export default loops