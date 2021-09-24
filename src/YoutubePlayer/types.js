// @flow
// https://developers.google.com/youtube/player_parameters
export type YoutubePlayerVars = {
  autoplay:number,
  controls:number,
  autohide:number,
  enablejsapi:number,
  loop:number,
  disablekb:number,
  fs:number,
  modestbranding:number,
  showinfo:number,
  rel:number,
}

export type YoutubePlayer = {
  cueVideoById(videoId:string, startSeconds:number, suggestedQuality:number):void
}
