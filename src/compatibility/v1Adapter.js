/**
 * Sopplayer v2.0 - v1 / Video.js Compatibility Layer
 * Preserves full backwards compatibility for legacy Video.js 7.x APIs and auto-init
 */

import { Sopplayer } from '../core/Sopplayer.js';

export function createV1Adapter(target, options = {}, readyCallback) {
  let videoEl;
  if (typeof target === 'string') {
    videoEl = document.getElementById(target) || document.querySelector(target);
  } else {
    videoEl = target;
  }

  if (!videoEl) {
    console.warn(`[Sopplayer v1 Compat] Target element not found: ${target}`);
    return null;
  }

  // If already initialized with Sopplayer, return existing adapter
  if (videoEl._sopplayerAdapter) {
    if (typeof readyCallback === 'function') {
      readyCallback.call(videoEl._sopplayerAdapter);
    }
    return videoEl._sopplayerAdapter;
  }

  // Create real modern Sopplayer instance
  const modernPlayer = videoEl._sopplayer || new Sopplayer(videoEl, options);
  videoEl._sopplayer = modernPlayer;

  // Create Video.js-compatible proxy object
  const adapter = {
    _player: modernPlayer,
    rawVideo: modernPlayer.video,

    play() {
      return modernPlayer.play();
    },
    pause() {
      modernPlayer.pause();
      return this;
    },
    paused() {
      return modernPlayer.paused;
    },

    currentTime(seconds) {
      if (typeof seconds === 'number') {
        modernPlayer.seek(seconds);
        return this;
      }
      return modernPlayer.currentTime;
    },

    duration() {
      return modernPlayer.duration;
    },

    volume(val) {
      if (typeof val === 'number') {
        modernPlayer.setVolume(val);
        return this;
      }
      return modernPlayer.volume;
    },

    muted(val) {
      if (typeof val === 'boolean') {
        modernPlayer.setMuted(val);
        return this;
      }
      return modernPlayer.muted;
    },

    playbackRate(rate) {
      if (typeof rate === 'number') {
        modernPlayer.setSpeed(rate);
        return this;
      }
      return modernPlayer.playbackRate;
    },

    src(source) {
      if (source) {
        const url = typeof source === 'string' ? source : (source.src || '');
        const type = typeof source === 'object' ? source.type : '';
        modernPlayer.setSource(url, type);
        return this;
      }
      return modernPlayer.video.src;
    },

    poster(url) {
      if (url) {
        modernPlayer.setPoster(url);
        return this;
      }
      return modernPlayer.video.poster;
    },

    requestFullscreen() {
      return modernPlayer.toggleFullscreen();
    },

    exitFullscreen() {
      return modernPlayer.fullscreenManager.exit();
    },

    isFullscreen() {
      return modernPlayer.fullscreenManager.isFullscreen();
    },

    on(event, fn) {
      modernPlayer.on(event, fn);
      return this;
    },

    off(event, fn) {
      modernPlayer.off(event, fn);
      return this;
    },

    one(event, fn) {
      modernPlayer.once(event, fn);
      return this;
    },

    trigger(event, data) {
      modernPlayer.emit(event, data);
      return this;
    },

    ready(fn) {
      if (typeof fn === 'function') {
        setTimeout(() => fn.call(this), 0);
      }
      return this;
    },

    el() {
      return modernPlayer.container;
    },

    dispose() {
      modernPlayer.destroy();
      delete videoEl._sopplayer;
      delete videoEl._sopplayerAdapter;
    }
  };

  videoEl._sopplayerAdapter = adapter;

  if (typeof readyCallback === 'function') {
    adapter.ready(readyCallback);
  }

  return adapter;
}

/**
 * Builds the global videojs compatible function
 */
export function setupV1Globals(globalScope = window) {
  const vjs = function (id, options, ready) {
    return createV1Adapter(id, options, ready);
  };

  vjs.VERSION = '7.10.2';
  vjs.registerPlugin = function (name, pluginFn) {
    // Basic plugin registry for VideoJS plugins like videojsBrand or persistvolume
    if (typeof pluginFn === 'function') {
      pluginFn.call(vjs);
    }
  };
  vjs.mergeOptions = function (...args) {
    return Object.assign({}, ...args);
  };
  vjs.getComponent = function () {
    return null;
  };

  globalScope.videojs = vjs;
  globalScope.sopplayer = vjs;

  // Auto-init on page load if elements with class="sopplayer" exist
  const autoInit = () => {
    Sopplayer.initAll('video.sopplayer, video.video-js, video[data-setup]');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
}
