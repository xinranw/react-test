export function timeToPercent(currentTime, duration){
  return currentTime / duration * 100
}

export function percentToTime(percent, duration){
  return percent * duration / 100
}