/**
 * Sopplayer v2.0 - Core Player Class
 * Zero-dependency, accessible, responsive HTML5 video player
 */

import { EventEmitter } from './EventEmitter.js';
import { createElement, sanitizeUrl, clamp } from './dom.js';
import { FullscreenManager } from './fullscreen.js';
import { PipManager } from './pip.js';
import { ShortcutsManager } from './shortcuts.js';
import { Announcer } from '../accessibility/announcements.js';

import { PlayToggle } from '../controls/PlayToggle.js';
import { ProgressBar } from '../controls/ProgressBar.js';
import { TimeDisplay } from '../controls/TimeDisplay.js';
import { VolumeControl } from '../controls/VolumeControl.js';
import { FullscreenToggle, PipToggle } from '../controls/FullscreenToggle.js';
import { SettingsMenu } from '../controls/SettingsMenu.js';

import { BigPlayButton } from '../components/BigPlayButton.js';
import { Spinner } from '../components/Spinner.js';
import { ErrorDisplay } from '../components/ErrorDisplay.js';
import { ShortcutsModal } from '../components/ShortcutsModal.js';

export class Sopplayer extends EventEmitter {
  static version = '2.0.0';

  static defaults = {
    theme: 'default',
    autoplay: false,
    muted: false,
    controls: true,
    loop: false,
    preload: 'metadata',
    volume: 1.0,
    playbackRate: 1.0,
    aspectRatio: '16:9',
    shortcuts: true,
    hideControlsDelay: 3000
  };

  constructor(target, options = {}) {
    super();

    this.options = { ...Sopplayer.defaults, ...options };
    this._resolveVideoElement(target);
    this._initContainer();
    this._initComponents();
    this._bindMediaEvents();
    this._bindUserActivity();

    // Initial setup from options
    if (this.options.theme) {
      this.setTheme(this.options.theme);
    }
    if (this.options.muted) {
      this.setMuted(true);
    }
    if (typeof this.options.volume === 'number') {
      this.setVolume(this.options.volume);
    }
    if (typeof this.options.playbackRate === 'number') {
      this.setSpeed(this.options.playbackRate);
    }

    // Announce player ready
    this.emit('ready', this);
  }

  _resolveVideoElement(target) {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (!el) {
        throw new Error(`[Sopplayer] Element not found for selector "${target}"`);
      }
      this.video = el;
    } else if (target instanceof HTMLVideoElement) {
      this.video = target;
    } else {
      throw new TypeError('[Sopplayer] Target must be a selector string or HTMLVideoElement');
    }

    // Ensure native controls are disabled so our modern UI is used
    this.video.controls = false;
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');
  }

  _initContainer() {
    // Wrap video in .sp-player container if not already wrapped
    const parent = this.video.parentNode;
    this.container = createElement('div', {
      className: `sp-player sp-theme-${this.options.theme}`,
      attrs: {
        tabindex: '0',
        'aria-label': 'Video Player',
        role: 'region'
      }
    });

    if (this.options.aspectRatio) {
      const aspectClass = `sp-aspect-${this.options.aspectRatio.replace(':', '-')}`;
      this.container.classList.add(aspectClass);
    }

    parent.insertBefore(this.container, this.video);
    this.container.appendChild(this.video);
  }

  _initComponents() {
    this.announcer = new Announcer(this.container);

    // Fullscreen & PiP managers
    this.fullscreenManager = new FullscreenManager(this.container, (isFullscreen) => {
      this.container.classList.toggle('sp-fullscreen', isFullscreen);
      this.fullscreenToggle.update(isFullscreen);
      this.announcer.announce(isFullscreen ? 'Entered fullscreen' : 'Exited fullscreen');
      this.emit('fullscreenchange', isFullscreen);
    });

    this.pipManager = new PipManager(this.video, (isPip) => {
      this.container.classList.toggle('sp-pip', isPip);
      this.pipToggle.update(isPip);
      this.announcer.announce(isPip ? 'Entered picture-in-picture' : 'Exited picture-in-picture');
      this.emit('pipchange', isPip);
    });

    // Components
    this.bigPlayButton = new BigPlayButton(this);
    this.spinner = new Spinner();
    this.errorDisplay = new ErrorDisplay(this);
    this.shortcutsModal = new ShortcutsModal(this);

    this.container.appendChild(this.bigPlayButton.element);
    this.container.appendChild(this.spinner.element);
    this.container.appendChild(this.errorDisplay.element);
    this.container.appendChild(this.shortcutsModal.element);

    // Controls bar
    this.controlsBar = createElement('div', { className: 'sp-controls' });

    // Progress bar at top of controls bar
    this.progressBar = new ProgressBar(this);
    this.controlsBar.appendChild(this.progressBar.container);

    // Bottom controls row
    this.controlsRow = createElement('div', { className: 'sp-controls-row' });

    // Left group: Play, Volume, Time
    this.leftControls = createElement('div', { className: 'sp-controls-left' });
    this.playToggle = new PlayToggle(this);
    this.volumeControl = new VolumeControl(this);
    this.timeDisplay = new TimeDisplay(this);

    this.leftControls.appendChild(this.playToggle.button);
    this.leftControls.appendChild(this.volumeControl.container);
    this.leftControls.appendChild(this.timeDisplay.container);

    // Right group: Settings, PiP, Fullscreen
    this.rightControls = createElement('div', { className: 'sp-controls-right' });
    this.settingsMenu = new SettingsMenu(this);
    this.pipToggle = new PipToggle(this);
    this.fullscreenToggle = new FullscreenToggle(this);

    this.rightControls.appendChild(this.settingsMenu.container);
    if (this.pipManager.isSupported()) {
      this.rightControls.appendChild(this.pipToggle.button);
    }
    if (this.fullscreenManager.isSupported()) {
      this.rightControls.appendChild(this.fullscreenToggle.button);
    }

    this.controlsRow.appendChild(this.leftControls);
    this.controlsRow.appendChild(this.rightControls);
    this.controlsBar.appendChild(this.controlsRow);
    this.container.appendChild(this.controlsBar);

    // Keyboard shortcuts
    if (this.options.shortcuts) {
      this.shortcuts = new ShortcutsManager(this);
    }
  }

  _bindMediaEvents() {
    const v = this.video;

    v.addEventListener('play', () => {
      this.container.classList.add('sp-playing');
      this.container.classList.remove('sp-paused', 'sp-ended');
      this.playToggle.setPlaying(true);
      this.bigPlayButton.hide();
      this.announcer.announce('Playing');
      this.emit('play');
    });

    v.addEventListener('pause', () => {
      this.container.classList.remove('sp-playing');
      this.container.classList.add('sp-paused');
      this.playToggle.setPlaying(false);
      this.showControls();
      this.announcer.announce('Paused');
      this.emit('pause');
    });

    v.addEventListener('ended', () => {
      this.container.classList.remove('sp-playing');
      this.container.classList.add('sp-ended');
      this.playToggle.setEnded();
      this.bigPlayButton.show();
      this.showControls();
      this.announcer.announce('Playback ended');
      this.emit('ended');
    });

    v.addEventListener('timeupdate', () => {
      const current = v.currentTime;
      const duration = v.duration || 0;
      const percent = duration > 0 ? (current / duration) * 100 : 0;

      this.progressBar.updateProgress(percent, current);
      this.timeDisplay.update(current, duration);
      this.emit('timeupdate', { currentTime: current, duration });
    });

    v.addEventListener('progress', () => {
      if (v.buffered.length > 0 && v.duration > 0) {
        const bufferedEnd = v.buffered.end(v.buffered.length - 1);
        const percent = (bufferedEnd / v.duration) * 100;
        this.progressBar.updateBuffered(percent);
      }
    });

    v.addEventListener('volumechange', () => {
      this.volumeControl.update(v.volume, v.muted);
      this.emit('volumechange', { volume: v.volume, muted: v.muted });
    });

    v.addEventListener('ratechange', () => {
      this.emit('ratechange', v.playbackRate);
    });

    v.addEventListener('waiting', () => {
      this.spinner.show();
      this.emit('waiting');
    });

    v.addEventListener('playing', () => {
      this.spinner.hide();
      this.emit('playing');
    });

    v.addEventListener('canplay', () => {
      this.spinner.hide();
      this.emit('canplay');
    });

    v.addEventListener('error', () => {
      this.spinner.hide();
      const err = v.error ? v.error.message : 'Unknown playback error';
      this.errorDisplay.show(`Error: ${err}`);
      this.emit('error', err);
    });

    // Clicking video directly toggles play
    v.addEventListener('click', () => {
      this.togglePlay();
    });
  }

  _bindUserActivity() {
    this._hideTimeout = null;

    const onActivity = () => {
      this.showControls();
      clearTimeout(this._hideTimeout);

      if (!this.video.paused && !this.settingsMenu.isOpen) {
        this._hideTimeout = setTimeout(() => {
          this.hideControls();
        }, this.options.hideControlsDelay);
      }
    };

    this.container.addEventListener('mousemove', onActivity);
    this.container.addEventListener('touchstart', onActivity, { passive: true });
    this.container.addEventListener('mouseleave', () => {
      if (!this.video.paused && !this.settingsMenu.isOpen) {
        this.hideControls();
      }
    });
  }

  showControls() {
    this.container.classList.remove('sp-user-inactive');
  }

  hideControls() {
    if (this.settingsMenu && this.settingsMenu.isOpen) return;
    this.container.classList.add('sp-user-inactive');
  }

  showControlsTemporarily() {
    this.showControls();
    clearTimeout(this._hideTimeout);
    if (!this.video.paused) {
      this._hideTimeout = setTimeout(() => this.hideControls(), this.options.hideControlsDelay);
    }
  }

  closeAllMenus() {
    if (this.settingsMenu) this.settingsMenu.close();
    if (this.shortcutsModal) this.shortcutsModal.close();
  }

  // --- Public Control APIs ---

  async play() {
    try {
      await this.video.play();
    } catch (err) {
      console.warn('[Sopplayer] Autoplay / play prevented:', err);
    }
  }

  pause() {
    this.video.pause();
  }

  togglePlay() {
    this.video.paused ? this.play() : this.pause();
  }

  seek(timeInSeconds) {
    const duration = this.duration || 0;
    this.video.currentTime = clamp(timeInSeconds, 0, duration);
  }

  forward(seconds = 5) {
    this.seek(this.currentTime + seconds);
  }

  rewind(seconds = 5) {
    this.seek(this.currentTime - seconds);
  }

  setVolume(volume) {
    const vol = clamp(volume, 0, 1);
    this.video.volume = vol;
    if (this.video.muted && vol > 0) {
      this.video.muted = false;
    }
    this.announcer.announce(`Volume ${Math.round(vol * 100)}%`);
  }

  setMuted(muted) {
    this.video.muted = Boolean(muted);
    this.announcer.announce(this.video.muted ? 'Muted' : 'Unmuted');
  }

  toggleMute() {
    this.setMuted(!this.video.muted);
  }

  setSpeed(rate) {
    this.video.playbackRate = rate;
    this.announcer.announce(`Speed ${rate}x`);
  }

  toggleFullscreen() {
    return this.fullscreenManager.toggle();
  }

  togglePip() {
    return this.pipManager.toggle();
  }

  toggleShortcuts() {
    this.shortcutsModal.toggle();
  }

  toggleCaptions() {
    const tracks = this.textTracks;
    if (!tracks || tracks.length === 0) return;
    const nextIndex = this.activeTrackIndex === -1 ? 0 : -1;
    this.setTrack(nextIndex);
  }

  setTrack(index) {
    const tracks = this.video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = i === index ? 'showing' : 'disabled';
    }
    const active = this.activeTrackLabel;
    this.announcer.announce(`Subtitles: ${active || 'Off'}`);
    this.emit('trackchange', index);
  }

  setSource(src, type) {
    const safeSrc = sanitizeUrl(src);
    if (!safeSrc) return;
    this.video.src = safeSrc;
    if (type) this.video.type = type;
    this.video.load();
  }

  setPoster(url) {
    const safeUrl = sanitizeUrl(url);
    this.video.poster = safeUrl;
  }

  setTheme(themeName) {
    const validThemes = ['default', 'flamingo', 'forest', 'city', 'sea', 'fantasy', 'minimal'];
    for (const t of validThemes) {
      this.container.classList.remove(`sp-theme-${t}`);
    }
    this.container.classList.add(`sp-theme-${themeName}`);
    this.options.theme = themeName;
    this.emit('themechange', themeName);
  }

  destroy() {
    clearTimeout(this._hideTimeout);
    if (this.shortcuts) this.shortcuts.destroy();
    if (this.fullscreenManager) this.fullscreenManager.destroy();
    if (this.pipManager) this.pipManager.destroy();
    if (this.announcer) this.announcer.destroy();

    // Restore video element to original state
    this.video.controls = true;
    const parent = this.container.parentNode;
    if (parent) {
      parent.insertBefore(this.video, this.container);
      parent.removeChild(this.container);
    }
    this.removeAllListeners();
  }

  // --- Getters ---

  get currentTime() {
    return this.video.currentTime || 0;
  }

  get duration() {
    return this.video.duration || 0;
  }

  get volume() {
    return this.video.volume;
  }

  get muted() {
    return this.video.muted;
  }

  get playbackRate() {
    return this.video.playbackRate;
  }

  get paused() {
    return this.video.paused;
  }

  get ended() {
    return this.video.ended;
  }

  get textTracks() {
    const tracks = [];
    if (this.video && this.video.textTracks) {
      for (let i = 0; i < this.video.textTracks.length; i++) {
        const t = this.video.textTracks[i];
        if (t.kind === 'subtitles' || t.kind === 'captions') {
          tracks.push(t);
        }
      }
    }
    return tracks;
  }

  get activeTrackIndex() {
    const tracks = this.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].mode === 'showing') return i;
    }
    return -1;
  }

  get activeTrackLabel() {
    const idx = this.activeTrackIndex;
    if (idx === -1) return null;
    const t = this.textTracks[idx];
    return t.label || t.language || `Track ${idx + 1}`;
  }

  // Static auto-initialization helper
  static initAll(selector = 'video.sopplayer, video[data-sop-player]', options = {}) {
    const videos = document.querySelectorAll(selector);
    const players = [];
    videos.forEach((video) => {
      // Don't re-initialize if already initialized
      if (video._sopplayer) return;

      // Parse data-setup attribute if present (v1 compat)
      let inlineOpts = {};
      const dataSetup = video.getAttribute('data-setup');
      if (dataSetup) {
        try {
          inlineOpts = JSON.parse(dataSetup);
        } catch (e) {
          // ignore malformed JSON
        }
      }

      const player = new Sopplayer(video, { ...inlineOpts, ...options });
      video._sopplayer = player;
      players.push(player);
    });
    return players;
  }
}
