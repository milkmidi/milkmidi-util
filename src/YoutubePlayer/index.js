// @flow
/* eslint-disable max-len */
import { EventEmitter } from 'events';
import { type YoutubePlayerVars } from './types';

// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
const DEFAULT_PLAYER_VARS:YoutubePlayerVars = {
  autoplay: 0,
  controls: 1,
  autohide: 1,
  enablejsapi: 1,
  loop: 0,
  disablekb: 1,
  fs: 1,
  modestbranding: 0,
  showinfo: 0,
  rel: 0,
};

/*
onStateChange
-1 (unstarted)
0 (ended)
1 (playing)
2 (paused)
3 (buffering)
5 (video cued).
 */

class YoutubePlayer extends EventEmitter {
  static ON_READY:string = 'onReady';

  static ON_STATE_CHANGE:string = 'onStateChange';

  static ON_PROGRESS:string = 'onProgress';

  static STATE_UNSTARTED:number = -1;

  static STATE_ENDED:number = 0;

  static STATE_PLAYING:number = 1;

  static STATE_PAUSED:number = 2;

  static STATE_BUFFERING:number = 3;

  static STATE_CUED:number = 5;

  loop:boolean = false;


  player:any;

  intervalId:number;

  destroyed:boolean = false;

  /**
   * @param {string} domID
   * @param {string} videoId
   * @param {number} width
   * @param {number} height
   * @param {DEFAULT_PLAYER_VARS} options
   */
  constructor(domID:string, videoId:string, width:number = 640, height:number = 390, options:YoutubePlayerVars | null = {}) {
    super();
    if (!videoId) {
      throw new Error('invalidate youtube id');
    }

    const playerVars = {
      ...DEFAULT_PLAYER_VARS,
      ...options,
    };
    this.loop = playerVars.loop === 1;

    this.player = new YT.Player(domID, {
      width,
      height,
      videoId,
      playerVars,
      events: {
        onReady: event => this.emit(YoutubePlayer.ON_STATE_CHANGE.ON_READY, event),
        onStateChange: ({ data }) => {
          this.emit(YoutubePlayer.ON_STATE_CHANGE, data);
          if (data === YoutubePlayer.STATE_ENDED && this.loop) {
            this.playVideo();
          }
          this.startEmitProgress(data === YoutubePlayer.STATE_PLAYING);
        },
      },
    });
  }

  startEmitProgress(isPlaying:boolean) {
    if (!isPlaying) {
      clearInterval(this.intervalId);
      this.intervalId = -1;
      return;
    }
    this.intervalId = setInterval(() => {
      this.emit(YoutubePlayer.ON_PROGRESS, this.getVideoLoadedFraction());
    }, 333);
  }

  cueVideoById(videoId:string, startSeconds:number, suggestedQuality) {
    this.player.cueVideoById(videoId, startSeconds, suggestedQuality);
  }

  loadVideoById(videoId:string, startSeconds:number, suggestedQuality) {
    this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  stopVideo() {
    this.player.stopVideo();
  }

  seekTo(seconds:number, allowSeekAhead:boolean) {
    this.player.seekTo(seconds, allowSeekAhead);
  }

  setSize(width:number, height:number) {
    this.player.setSize(width, height);
  }

  getVideoLoadedFraction() {
    if (this.player && this.player.getVideoLoadedFraction) {
      return this.player.getVideoLoadedFraction();
    }
    return 0;
  }

  getPlayer() {
    return this.player;
  }

  destroy() {
    if (this.destroyed) {
      return;
    }
    this.removeAllListeners();
    this.player.destroy();
    this.player = null;
    clearInterval(this.intervalId);
    this.intervalId = -1;
    this.destroyed = true;
  }
}


let isAPIScriptAppend:boolean = false;
export const fetchScript = () => {
  if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
    return Promise.resolve(window.YT);
  }
  return new Promise((resolve) => {
    if (!isAPIScriptAppend) {
      isAPIScriptAppend = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    const previous = window.onYouTubeIframeAPIReady;

    // The API will call this function when page has finished downloading
    // the JavaScript for the player API.
    window.onYouTubeIframeAPIReady = () => {
      if (previous) {
        previous();
      }
      resolve(window.YT);
    };
  });
};


export default YoutubePlayer;
