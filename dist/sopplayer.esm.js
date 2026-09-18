var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/core/EventEmitter.js
var EventEmitter = class {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  on(event, handler) {
    if (typeof handler !== "function") {
      throw new TypeError(`Event handler for "${event}" must be a function`);
    }
    if (!this._listeners.has(event)) {
      this._listeners.set(event, /* @__PURE__ */ new Set());
    }
    this._listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }
  once(event, handler) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      handler.apply(this, args);
    };
    wrapper._original = handler;
    return this.on(event, wrapper);
  }
  off(event, handler) {
    if (!this._listeners.has(event)) return this;
    if (!handler) {
      this._listeners.delete(event);
      return this;
    }
    const set = this._listeners.get(event);
    for (const item of set) {
      if (item === handler || item._original === handler) {
        set.delete(item);
        break;
      }
    }
    if (set.size === 0) {
      this._listeners.delete(event);
    }
    return this;
  }
  emit(event, ...args) {
    if (!this._listeners.has(event)) return false;
    const listeners = Array.from(this._listeners.get(event));
    for (let i = 0; i < listeners.length; i++) {
      try {
        listeners[i].apply(this, args);
      } catch (err) {
        console.error(`[Sopplayer] Error in event handler for "${event}":`, err);
      }
    }
    return true;
  }
  removeAllListeners() {
    this._listeners.clear();
    return this;
  }
};

// src/core/dom.js
function sanitizeUrl(url) {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("vbscript:") || lower.startsWith("data:text/html") || lower.startsWith("data:application/javascript")) {
    console.warn(`[Sopplayer Security] Blocked potentially unsafe URL: ${trimmed}`);
    return "";
  }
  return trimmed;
}
function escapeHtml(text) {
  if (text == null) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function formatTime(seconds, forceHours = false) {
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
    return forceHours ? "00:00:00" : "00:00";
  }
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60 % 60);
  const h = Math.floor(seconds / 3600);
  const pad = (n) => String(n).padStart(2, "0");
  if (h > 0 || forceHours) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}
function clamp(val, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}
function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) {
    el.className = options.className;
  }
  if (options.text !== void 0 && options.text !== null) {
    el.textContent = options.text;
  }
  if (options.html) {
    el.innerHTML = options.html;
  }
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value !== void 0 && value !== null && value !== false) {
        el.setAttribute(key, value === true ? "" : String(value));
      }
    }
  }
  if (options.events) {
    for (const [event, handler] of Object.entries(options.events)) {
      el.addEventListener(event, handler);
    }
  }
  if (options.children && Array.isArray(options.children)) {
    for (const child of options.children) {
      if (child instanceof Node) {
        el.appendChild(child);
      }
    }
  }
  return el;
}

// src/core/fullscreen.js
var FullscreenManager = class {
  constructor(element, onChange) {
    this.element = element;
    this.onChange = onChange;
    this._handleFullscreenChange = this._handleFullscreenChange.bind(this);
    document.addEventListener("fullscreenchange", this._handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this._handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", this._handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", this._handleFullscreenChange);
  }
  _handleFullscreenChange() {
    if (this.onChange) {
      this.onChange(this.isFullscreen());
    }
  }
  isSupported() {
    return Boolean(
      document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
    );
  }
  isFullscreen() {
    return Boolean(
      document.fullscreenElement === this.element || document.webkitFullscreenElement === this.element || document.mozFullScreenElement === this.element || document.msFullscreenElement === this.element
    );
  }
  async request() {
    const el = this.element;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        await el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        await el.msRequestFullscreen();
      }
      return true;
    } catch (err) {
      console.warn("[Sopplayer] Fullscreen request error:", err);
      return false;
    }
  }
  async exit() {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      return true;
    } catch (err) {
      console.warn("[Sopplayer] Fullscreen exit error:", err);
      return false;
    }
  }
  toggle() {
    return this.isFullscreen() ? this.exit() : this.request();
  }
  destroy() {
    document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this._handleFullscreenChange);
    document.removeEventListener("mozfullscreenchange", this._handleFullscreenChange);
    document.removeEventListener("MSFullscreenChange", this._handleFullscreenChange);
  }
};

// src/core/pip.js
var PipManager = class {
  constructor(videoElement, onChange) {
    this.video = videoElement;
    this.onChange = onChange;
    this._handleEnter = this._handleEnter.bind(this);
    this._handleLeave = this._handleLeave.bind(this);
    this.video.addEventListener("enterpictureinpicture", this._handleEnter);
    this.video.addEventListener("leavepictureinpicture", this._handleLeave);
  }
  _handleEnter() {
    if (this.onChange) this.onChange(true);
  }
  _handleLeave() {
    if (this.onChange) this.onChange(false);
  }
  isSupported() {
    return Boolean(
      document.pictureInPictureEnabled || this.video.webkitSupportsPresentationMode && typeof this.video.webkitSetPresentationMode === "function"
    );
  }
  isPip() {
    return Boolean(document.pictureInPictureElement === this.video);
  }
  async request() {
    if (!this.isSupported()) return false;
    try {
      if (document.pictureInPictureEnabled && this.video.requestPictureInPicture) {
        await this.video.requestPictureInPicture();
        return true;
      } else if (this.video.webkitSetPresentationMode) {
        this.video.webkitSetPresentationMode("picture-in-picture");
        return true;
      }
    } catch (err) {
      console.warn("[Sopplayer] PiP request error:", err);
      return false;
    }
    return false;
  }
  async exit() {
    try {
      if (document.exitPictureInPicture) {
        await document.exitPictureInPicture();
        return true;
      } else if (this.video.webkitSetPresentationMode) {
        this.video.webkitSetPresentationMode("inline");
        return true;
      }
    } catch (err) {
      console.warn("[Sopplayer] PiP exit error:", err);
      return false;
    }
    return false;
  }
  toggle() {
    return this.isPip() ? this.exit() : this.request();
  }
  destroy() {
    this.video.removeEventListener("enterpictureinpicture", this._handleEnter);
    this.video.removeEventListener("leavepictureinpicture", this._handleLeave);
  }
};

// src/core/shortcuts.js
var ShortcutsManager = class {
  constructor(player) {
    this.player = player;
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.enabled = true;
    this.player.container.addEventListener("keydown", this._handleKeyDown);
  }
  _handleKeyDown(e) {
    if (!this.enabled) return;
    const active = document.activeElement;
    if (active) {
      const tag = active.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || active.isContentEditable) {
        return;
      }
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    let handled = true;
    switch (e.key) {
      case " ":
      case "k":
      case "K":
        e.preventDefault();
        this.player.togglePlay();
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.player.rewind(e.shiftKey ? 10 : 5);
        break;
      case "ArrowRight":
        e.preventDefault();
        this.player.forward(e.shiftKey ? 10 : 5);
        break;
      case "j":
      case "J":
        e.preventDefault();
        this.player.rewind(10);
        break;
      case "l":
      case "L":
        e.preventDefault();
        this.player.forward(10);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.player.setVolume(Math.min(1, this.player.volume + 0.1));
        break;
      case "ArrowDown":
        e.preventDefault();
        this.player.setVolume(Math.max(0, this.player.volume - 0.1));
        break;
      case "m":
      case "M":
        e.preventDefault();
        this.player.toggleMute();
        break;
      case "f":
      case "F":
        e.preventDefault();
        this.player.toggleFullscreen();
        break;
      case "p":
      case "P":
        e.preventDefault();
        this.player.togglePip();
        break;
      case "c":
      case "C":
        e.preventDefault();
        this.player.toggleCaptions();
        break;
      case "?":
        e.preventDefault();
        this.player.toggleShortcuts();
        break;
      case "Escape":
        this.player.closeAllMenus();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (this.player.duration > 0) {
          e.preventDefault();
          const fraction = parseInt(e.key, 10) / 10;
          this.player.seek(this.player.duration * fraction);
        }
        break;
      default:
        handled = false;
        break;
    }
    if (handled) {
      this.player.showControlsTemporarily();
    }
  }
  destroy() {
    this.player.container.removeEventListener("keydown", this._handleKeyDown);
  }
};

// src/accessibility/announcements.js
var Announcer = class {
  constructor(container) {
    this.el = document.createElement("div");
    this.el.className = "sp-sr-only";
    this.el.setAttribute("aria-live", "polite");
    this.el.setAttribute("aria-atomic", "true");
    container.appendChild(this.el);
  }
  announce(message) {
    if (!message) return;
    this.el.textContent = "";
    setTimeout(() => {
      this.el.textContent = message;
    }, 50);
  }
  destroy() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
};

// src/controls/icons.js
var icons = {
  play: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 5.14v14l11-7-11-7z"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
  replay: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>`,
  volumeHigh: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
  volumeLow: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7 9v6h4l5 5V4L11 9H7zm8.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`,
  volumeMute: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
  fullscreenEnter: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,
  fullscreenExit: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`,
  pip: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  captions: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>`,
  speed: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.28-10.43zm-9.13 4.67a2 2 0 0 0 2.83 0l4.24-6.36-6.36 4.24a2 2 0 0 0-.71 2.12z"/></svg>`,
  keyboard: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
  forward: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>`,
  backward: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>`,
  spinner: `<svg viewBox="0 0 50 50" width="40" height="40" aria-hidden="true" class="sp-spinner-svg"><circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="31.415, 31.415" stroke-linecap="round"></circle></svg>`
};

// src/controls/PlayToggle.js
var PlayToggle = class {
  constructor(player) {
    this.player = player;
    this.isPlaying = false;
    this.button = createElement("button", {
      className: "sp-button sp-play-toggle",
      attrs: {
        type: "button",
        "aria-label": "Play",
        title: "Play (k / Space)"
      },
      html: icons.play,
      events: {
        click: () => this.player.togglePlay()
      }
    });
  }
  setPlaying(playing) {
    this.isPlaying = playing;
    this.button.innerHTML = playing ? icons.pause : icons.play;
    this.button.setAttribute("aria-label", playing ? "Pause" : "Play");
    this.button.setAttribute("title", playing ? "Pause (k / Space)" : "Play (k / Space)");
  }
  setEnded() {
    this.isPlaying = false;
    this.button.innerHTML = icons.replay;
    this.button.setAttribute("aria-label", "Replay");
    this.button.setAttribute("title", "Replay (k / Space)");
  }
};

// src/controls/ProgressBar.js
var ProgressBar = class {
  constructor(player) {
    this.player = player;
    this.isDragging = false;
    this._initElements();
    this._bindEvents();
  }
  _initElements() {
    this.container = createElement("div", {
      className: "sp-progress-container",
      attrs: {
        role: "slider",
        "aria-label": "Seek slider",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": "0",
        "aria-valuetext": "00:00",
        tabindex: "0"
      }
    });
    this.track = createElement("div", { className: "sp-progress-track" });
    this.buffered = createElement("div", { className: "sp-progress-buffered" });
    this.playProgress = createElement("div", { className: "sp-progress-played" });
    this.thumb = createElement("div", { className: "sp-progress-thumb" });
    this.hoverPreview = createElement("div", { className: "sp-progress-hover" });
    this.tooltip = createElement("div", { className: "sp-progress-tooltip", text: "00:00" });
    this.track.appendChild(this.buffered);
    this.track.appendChild(this.hoverPreview);
    this.track.appendChild(this.playProgress);
    this.track.appendChild(this.thumb);
    this.container.appendChild(this.track);
    this.container.appendChild(this.tooltip);
  }
  _bindEvents() {
    const onMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const duration = this.player.duration || 0;
      const hoverTime = ratio * duration;
      this.tooltip.textContent = formatTime(hoverTime);
      this.tooltip.style.left = `${ratio * 100}%`;
      this.hoverPreview.style.width = `${ratio * 100}%`;
      if (this.isDragging) {
        this.player.seek(hoverTime);
        this.updateProgress(ratio * 100, hoverTime);
      }
    };
    const onStart = (e) => {
      this.isDragging = true;
      this.container.classList.add("sp-is-scrubbing");
      onMove(e);
      const onEnd = () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.container.classList.remove("sp-is-scrubbing");
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onEnd);
          window.removeEventListener("touchmove", onMove);
          window.removeEventListener("touchend", onEnd);
        }
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onMove);
      window.addEventListener("touchend", onEnd);
    };
    this.container.addEventListener("mousedown", onStart);
    this.container.addEventListener("touchstart", onStart, { passive: true });
    this.container.addEventListener("mousemove", (e) => {
      if (!this.isDragging) onMove(e);
    });
    this.container.addEventListener("mouseleave", () => {
      if (!this.isDragging) {
        this.hoverPreview.style.width = "0%";
      }
    });
    this.container.addEventListener("keydown", (e) => {
      const step = 5;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        this.player.rewind(step);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        this.player.forward(step);
      } else if (e.key === "Home") {
        e.preventDefault();
        this.player.seek(0);
      } else if (e.key === "End") {
        e.preventDefault();
        this.player.seek(this.player.duration);
      }
    });
  }
  updateProgress(percent, currentTime) {
    if (this.isDragging) return;
    const p = clamp(percent, 0, 100);
    this.playProgress.style.width = `${p}%`;
    this.thumb.style.left = `${p}%`;
    this.container.setAttribute("aria-valuenow", Math.round(p).toString());
    this.container.setAttribute("aria-valuetext", formatTime(currentTime));
  }
  updateBuffered(bufferedPercent) {
    const p = clamp(bufferedPercent, 0, 100);
    this.buffered.style.width = `${p}%`;
  }
};

// src/controls/TimeDisplay.js
var TimeDisplay = class {
  constructor(player) {
    this.player = player;
    this.showRemaining = false;
    this.container = createElement("div", {
      className: "sp-time-display",
      attrs: {
        "aria-label": "Playback time",
        title: "Click to toggle remaining time"
      },
      events: {
        click: () => {
          this.showRemaining = !this.showRemaining;
          this.update(this.player.currentTime, this.player.duration);
        }
      }
    });
    this.currentSpan = createElement("span", { className: "sp-time-current", text: "00:00" });
    this.separator = createElement("span", { className: "sp-time-separator", text: "/" });
    this.durationSpan = createElement("span", { className: "sp-time-duration", text: "00:00" });
    this.container.appendChild(this.currentSpan);
    this.container.appendChild(this.separator);
    this.container.appendChild(this.durationSpan);
  }
  update(current, duration) {
    const forceHours = (duration || 0) >= 3600;
    if (this.showRemaining) {
      const remaining = Math.max(0, (duration || 0) - (current || 0));
      this.currentSpan.textContent = `-${formatTime(remaining, forceHours)}`;
      this.separator.style.display = "none";
      this.durationSpan.style.display = "none";
    } else {
      this.currentSpan.textContent = formatTime(current || 0, forceHours);
      this.separator.style.display = "inline";
      this.durationSpan.style.display = "inline";
      this.durationSpan.textContent = formatTime(duration || 0, forceHours);
    }
  }
};

// src/controls/VolumeControl.js
var VolumeControl = class {
  constructor(player) {
    this.player = player;
    this.isDragging = false;
    this.container = createElement("div", { className: "sp-volume-control" });
    this.muteButton = createElement("button", {
      className: "sp-button sp-mute-toggle",
      attrs: {
        type: "button",
        "aria-label": "Mute",
        title: "Mute (m)"
      },
      html: icons.volumeHigh,
      events: {
        click: () => this.player.toggleMute()
      }
    });
    this.sliderContainer = createElement("div", {
      className: "sp-volume-slider-container",
      attrs: {
        role: "slider",
        "aria-label": "Volume",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": "100",
        "aria-valuetext": "100%",
        tabindex: "0"
      }
    });
    this.track = createElement("div", { className: "sp-volume-track" });
    this.filled = createElement("div", { className: "sp-volume-filled" });
    this.thumb = createElement("div", { className: "sp-volume-thumb" });
    this.track.appendChild(this.filled);
    this.track.appendChild(this.thumb);
    this.sliderContainer.appendChild(this.track);
    this.container.appendChild(this.muteButton);
    this.container.appendChild(this.sliderContainer);
    this._bindEvents();
  }
  _bindEvents() {
    const onMove = (e) => {
      const rect = this.sliderContainer.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      this.player.setVolume(ratio);
      if (this.player.muted && ratio > 0) {
        this.player.setMuted(false);
      }
    };
    const onStart = (e) => {
      this.isDragging = true;
      this.sliderContainer.classList.add("sp-is-dragging");
      onMove(e);
      const onEnd = () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.sliderContainer.classList.remove("sp-is-dragging");
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onEnd);
          window.removeEventListener("touchmove", onMove);
          window.removeEventListener("touchend", onEnd);
        }
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onMove);
      window.addEventListener("touchend", onEnd);
    };
    this.sliderContainer.addEventListener("mousedown", onStart);
    this.sliderContainer.addEventListener("touchstart", onStart, { passive: true });
    this.sliderContainer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        this.player.setVolume(Math.max(0, this.player.volume - 0.05));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        this.player.setVolume(Math.min(1, this.player.volume + 0.05));
      }
    });
    this.container.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      this.player.setVolume(clamp(this.player.volume + delta, 0, 1));
    }, { passive: false });
  }
  update(volume, muted) {
    const effectiveVol = muted ? 0 : volume;
    const percent = Math.round(effectiveVol * 100);
    this.filled.style.width = `${percent}%`;
    this.thumb.style.left = `${percent}%`;
    this.sliderContainer.setAttribute("aria-valuenow", percent.toString());
    this.sliderContainer.setAttribute("aria-valuetext", `${percent}%`);
    if (muted || effectiveVol === 0) {
      this.muteButton.innerHTML = icons.volumeMute;
      this.muteButton.setAttribute("aria-label", "Unmute");
      this.muteButton.setAttribute("title", "Unmute (m)");
    } else if (effectiveVol < 0.5) {
      this.muteButton.innerHTML = icons.volumeLow;
      this.muteButton.setAttribute("aria-label", "Mute");
      this.muteButton.setAttribute("title", "Mute (m)");
    } else {
      this.muteButton.innerHTML = icons.volumeHigh;
      this.muteButton.setAttribute("aria-label", "Mute");
      this.muteButton.setAttribute("title", "Mute (m)");
    }
  }
};

// src/controls/FullscreenToggle.js
var FullscreenToggle = class {
  constructor(player) {
    this.player = player;
    this.button = createElement("button", {
      className: "sp-button sp-fullscreen-toggle",
      attrs: {
        type: "button",
        "aria-label": "Fullscreen",
        title: "Fullscreen (f)"
      },
      html: icons.fullscreenEnter,
      events: {
        click: () => this.player.toggleFullscreen()
      }
    });
  }
  update(isFullscreen) {
    this.button.innerHTML = isFullscreen ? icons.fullscreenExit : icons.fullscreenEnter;
    this.button.setAttribute("aria-label", isFullscreen ? "Exit Fullscreen" : "Fullscreen");
    this.button.setAttribute("title", isFullscreen ? "Exit Fullscreen (f)" : "Fullscreen (f)");
  }
};
var PipToggle = class {
  constructor(player) {
    this.player = player;
    this.button = createElement("button", {
      className: "sp-button sp-pip-toggle",
      attrs: {
        type: "button",
        "aria-label": "Picture-in-Picture",
        title: "Picture-in-Picture (p)"
      },
      html: icons.pip,
      events: {
        click: () => this.player.togglePip()
      }
    });
  }
  update(isPip) {
    this.button.classList.toggle("sp-active", isPip);
  }
};

// src/controls/SettingsMenu.js
var SettingsMenu = class {
  constructor(player) {
    this.player = player;
    this.isOpen = false;
    this.currentSubmenu = null;
    this.container = createElement("div", { className: "sp-settings-container" });
    this.toggleButton = createElement("button", {
      className: "sp-button sp-settings-toggle",
      attrs: {
        type: "button",
        "aria-label": "Settings",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        title: "Settings"
      },
      html: icons.settings,
      events: {
        click: (e) => {
          e.stopPropagation();
          this.toggle();
        }
      }
    });
    this.menu = createElement("div", {
      className: "sp-settings-menu sp-hidden",
      attrs: { role: "menu", "aria-label": "Player settings" },
      events: {
        click: (e) => e.stopPropagation()
      }
    });
    this.container.appendChild(this.toggleButton);
    this.container.appendChild(this.menu);
    document.addEventListener("click", () => {
      if (this.isOpen) this.close();
    });
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  open() {
    this.isOpen = true;
    this.currentSubmenu = null;
    this.menu.classList.remove("sp-hidden");
    this.toggleButton.setAttribute("aria-expanded", "true");
    this.renderMainMenu();
  }
  close() {
    this.isOpen = false;
    this.currentSubmenu = null;
    this.menu.classList.add("sp-hidden");
    this.toggleButton.setAttribute("aria-expanded", "false");
  }
  renderMainMenu() {
    this.menu.innerHTML = "";
    const currentSpeed = `${this.player.playbackRate}x`;
    const speedItem = this._createMenuItem({
      label: "Playback Speed",
      value: currentSpeed === "1x" ? "Normal" : currentSpeed,
      onClick: () => this.renderSpeedSubmenu()
    });
    const tracks = this.player.textTracks;
    if (tracks && tracks.length > 0) {
      const activeTrack = this.player.activeTrackLabel || "Off";
      const captionsItem = this._createMenuItem({
        label: "Subtitles",
        value: activeTrack,
        onClick: () => this.renderCaptionsSubmenu()
      });
      this.menu.appendChild(captionsItem);
    }
    const loopItem = this._createToggleItem({
      label: "Loop Video",
      checked: Boolean(this.player.video.loop),
      onToggle: (checked) => {
        this.player.video.loop = checked;
        this.renderMainMenu();
      }
    });
    const shortcutsItem = this._createMenuItem({
      label: "Keyboard Shortcuts",
      value: "?",
      onClick: () => {
        this.close();
        this.player.toggleShortcuts();
      }
    });
    this.menu.appendChild(speedItem);
    this.menu.appendChild(loopItem);
    this.menu.appendChild(shortcutsItem);
  }
  renderSpeedSubmenu() {
    this.menu.innerHTML = "";
    const backItem = this._createSubmenuHeader("Playback Speed", () => this.renderMainMenu());
    this.menu.appendChild(backItem);
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    for (const rate of speeds) {
      const isSelected = this.player.playbackRate === rate;
      const label = rate === 1 ? "Normal" : `${rate}x`;
      const item = createElement("button", {
        className: `sp-menu-item sp-radio-item ${isSelected ? "sp-selected" : ""}`,
        attrs: { role: "menuitemradio", "aria-checked": isSelected.toString(), type: "button" },
        html: `<span>${label}</span>${isSelected ? icons.check : ""}`,
        events: {
          click: () => {
            this.player.setSpeed(rate);
            this.close();
          }
        }
      });
      this.menu.appendChild(item);
    }
  }
  renderCaptionsSubmenu() {
    this.menu.innerHTML = "";
    const backItem = this._createSubmenuHeader("Subtitles / Captions", () => this.renderMainMenu());
    this.menu.appendChild(backItem);
    const isOff = this.player.activeTrackIndex === -1;
    const offItem = createElement("button", {
      className: `sp-menu-item sp-radio-item ${isOff ? "sp-selected" : ""}`,
      attrs: { role: "menuitemradio", "aria-checked": isOff.toString(), type: "button" },
      html: `<span>Off</span>${isOff ? icons.check : ""}`,
      events: {
        click: () => {
          this.player.setTrack(-1);
          this.close();
        }
      }
    });
    this.menu.appendChild(offItem);
    const tracks = this.player.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const isSelected = this.player.activeTrackIndex === i;
      const track = tracks[i];
      const label = track.label || track.language || `Track ${i + 1}`;
      const item = createElement("button", {
        className: `sp-menu-item sp-radio-item ${isSelected ? "sp-selected" : ""}`,
        attrs: { role: "menuitemradio", "aria-checked": isSelected.toString(), type: "button" },
        html: `<span>${label}</span>${isSelected ? icons.check : ""}`,
        events: {
          click: () => {
            this.player.setTrack(i);
            this.close();
          }
        }
      });
      this.menu.appendChild(item);
    }
  }
  _createMenuItem({ label, value, onClick }) {
    return createElement("button", {
      className: "sp-menu-item",
      attrs: { role: "menuitem", type: "button" },
      html: `
        <span class="sp-menu-label">${label}</span>
        <span class="sp-menu-value">${value} &rsaquo;</span>
      `,
      events: { click: onClick }
    });
  }
  _createToggleItem({ label, checked, onToggle }) {
    const item = createElement("button", {
      className: "sp-menu-item sp-toggle-item",
      attrs: { role: "menuitemcheckbox", "aria-checked": checked.toString(), type: "button" },
      html: `
        <span class="sp-menu-label">${label}</span>
        <span class="sp-menu-switch ${checked ? "sp-switch-on" : ""}"></span>
      `,
      events: {
        click: () => onToggle(!checked)
      }
    });
    return item;
  }
  _createSubmenuHeader(title, onBack) {
    return createElement("button", {
      className: "sp-menu-item sp-menu-header",
      attrs: { role: "menuitem", type: "button" },
      html: `
        <span class="sp-menu-back">&lsaquo;</span>
        <span class="sp-menu-title">${title}</span>
      `,
      events: { click: onBack }
    });
  }
};

// src/components/BigPlayButton.js
var BigPlayButton = class {
  constructor(player) {
    this.player = player;
    this.element = createElement("button", {
      className: "sp-big-play-btn",
      attrs: {
        type: "button",
        "aria-label": "Play video",
        title: "Play"
      },
      html: `
        <div class="sp-big-play-icon">
          ${icons.play}
        </div>
      `,
      events: {
        click: (e) => {
          e.stopPropagation();
          this.player.play();
        }
      }
    });
  }
  hide() {
    this.element.classList.add("sp-hidden");
  }
  show() {
    this.element.classList.remove("sp-hidden");
  }
};

// src/components/Spinner.js
var Spinner = class {
  constructor() {
    this.element = createElement("div", {
      className: "sp-spinner sp-hidden",
      attrs: { "aria-label": "Buffering video", role: "status" },
      html: icons.spinner
    });
  }
  show() {
    this.element.classList.remove("sp-hidden");
  }
  hide() {
    this.element.classList.add("sp-hidden");
  }
};

// src/components/ErrorDisplay.js
var ErrorDisplay = class {
  constructor(player) {
    this.player = player;
    this.element = createElement("div", {
      className: "sp-error-display sp-hidden",
      attrs: { role: "alert", "aria-live": "assertive" }
    });
    this.message = createElement("div", { className: "sp-error-message" });
    this.retryBtn = createElement("button", {
      className: "sp-error-retry",
      text: "Retry Playback",
      attrs: { type: "button" },
      events: {
        click: (e) => {
          e.stopPropagation();
          this.hide();
          this.player.video.load();
          this.player.play().catch(() => {
          });
        }
      }
    });
    this.element.appendChild(this.message);
    this.element.appendChild(this.retryBtn);
  }
  show(text) {
    this.message.textContent = text || "The media playback was interrupted or the format is not supported.";
    this.element.classList.remove("sp-hidden");
  }
  hide() {
    this.element.classList.add("sp-hidden");
  }
};

// src/components/ShortcutsModal.js
var ShortcutsModal = class {
  constructor(player) {
    this.player = player;
    this.element = createElement("div", {
      className: "sp-modal-backdrop sp-hidden",
      attrs: {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "sp-shortcuts-title"
      },
      events: {
        click: (e) => {
          if (e.target === this.element) this.close();
        }
      }
    });
    const modal = createElement("div", { className: "sp-modal-content" });
    const header = createElement("div", {
      className: "sp-modal-header",
      html: `
        <h3 id="sp-shortcuts-title" class="sp-modal-title">Keyboard Shortcuts</h3>
      `
    });
    const closeBtn = createElement("button", {
      className: "sp-modal-close",
      attrs: { type: "button", "aria-label": "Close shortcuts modal" },
      html: icons.close,
      events: {
        click: () => this.close()
      }
    });
    header.appendChild(closeBtn);
    const list = createElement("div", {
      className: "sp-shortcuts-grid",
      html: `
        <div class="sp-shortcut-row"><kbd>Space</kbd> or <kbd>K</kbd> <span>Play / Pause</span></div>
        <div class="sp-shortcut-row"><kbd>&larr;</kbd> / <kbd>&rarr;</kbd> <span>Seek &plusmn;5 seconds</span></div>
        <div class="sp-shortcut-row"><kbd>J</kbd> / <kbd>L</kbd> <span>Seek &plusmn;10 seconds</span></div>
        <div class="sp-shortcut-row"><kbd>&uarr;</kbd> / <kbd>&darr;</kbd> <span>Volume &plusmn;10%</span></div>
        <div class="sp-shortcut-row"><kbd>M</kbd> <span>Mute / Unmute</span></div>
        <div class="sp-shortcut-row"><kbd>F</kbd> <span>Toggle Fullscreen</span></div>
        <div class="sp-shortcut-row"><kbd>P</kbd> <span>Toggle Picture-in-Picture</span></div>
        <div class="sp-shortcut-row"><kbd>C</kbd> <span>Toggle Subtitles</span></div>
        <div class="sp-shortcut-row"><kbd>0</kbd>&ndash;<kbd>9</kbd> <span>Seek to 0% &ndash; 90%</span></div>
        <div class="sp-shortcut-row"><kbd>?</kbd> <span>Open this help dialog</span></div>
        <div class="sp-shortcut-row"><kbd>Esc</kbd> <span>Close dialog / menu</span></div>
      `
    });
    modal.appendChild(header);
    modal.appendChild(list);
    this.element.appendChild(modal);
  }
  toggle() {
    this.element.classList.contains("sp-hidden") ? this.open() : this.close();
  }
  open() {
    this.element.classList.remove("sp-hidden");
    const closeBtn = this.element.querySelector(".sp-modal-close");
    if (closeBtn) closeBtn.focus();
  }
  close() {
    this.element.classList.add("sp-hidden");
    this.player.container.focus();
  }
};

// src/core/Sopplayer.js
var _Sopplayer = class _Sopplayer extends EventEmitter {
  constructor(target, options = {}) {
    super();
    this.options = { ..._Sopplayer.defaults, ...options };
    this._resolveVideoElement(target);
    this._initContainer();
    this._initComponents();
    this._bindMediaEvents();
    this._bindUserActivity();
    if (this.options.theme) {
      this.setTheme(this.options.theme);
    }
    if (this.options.muted) {
      this.setMuted(true);
    }
    if (typeof this.options.volume === "number") {
      this.setVolume(this.options.volume);
    }
    if (typeof this.options.playbackRate === "number") {
      this.setSpeed(this.options.playbackRate);
    }
    this.emit("ready", this);
  }
  _resolveVideoElement(target) {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (!el) {
        throw new Error(`[Sopplayer] Element not found for selector "${target}"`);
      }
      this.video = el;
    } else if (target instanceof HTMLVideoElement) {
      this.video = target;
    } else {
      throw new TypeError("[Sopplayer] Target must be a selector string or HTMLVideoElement");
    }
    this.video.controls = false;
    this.video.playsInline = true;
    this.video.setAttribute("playsinline", "");
    this.video.setAttribute("webkit-playsinline", "");
  }
  _initContainer() {
    const parent = this.video.parentNode;
    this.container = createElement("div", {
      className: `sp-player sp-theme-${this.options.theme}`,
      attrs: {
        tabindex: "0",
        "aria-label": "Video Player",
        role: "region"
      }
    });
    if (this.options.aspectRatio) {
      const aspectClass = `sp-aspect-${this.options.aspectRatio.replace(":", "-")}`;
      this.container.classList.add(aspectClass);
    }
    parent.insertBefore(this.container, this.video);
    this.container.appendChild(this.video);
  }
  _initComponents() {
    this.announcer = new Announcer(this.container);
    this.fullscreenManager = new FullscreenManager(this.container, (isFullscreen) => {
      this.container.classList.toggle("sp-fullscreen", isFullscreen);
      this.fullscreenToggle.update(isFullscreen);
      this.announcer.announce(isFullscreen ? "Entered fullscreen" : "Exited fullscreen");
      this.emit("fullscreenchange", isFullscreen);
    });
    this.pipManager = new PipManager(this.video, (isPip) => {
      this.container.classList.toggle("sp-pip", isPip);
      this.pipToggle.update(isPip);
      this.announcer.announce(isPip ? "Entered picture-in-picture" : "Exited picture-in-picture");
      this.emit("pipchange", isPip);
    });
    this.bigPlayButton = new BigPlayButton(this);
    this.spinner = new Spinner();
    this.errorDisplay = new ErrorDisplay(this);
    this.shortcutsModal = new ShortcutsModal(this);
    this.container.appendChild(this.bigPlayButton.element);
    this.container.appendChild(this.spinner.element);
    this.container.appendChild(this.errorDisplay.element);
    this.container.appendChild(this.shortcutsModal.element);
    this.controlsBar = createElement("div", { className: "sp-controls" });
    this.progressBar = new ProgressBar(this);
    this.controlsBar.appendChild(this.progressBar.container);
    this.controlsRow = createElement("div", { className: "sp-controls-row" });
    this.leftControls = createElement("div", { className: "sp-controls-left" });
    this.playToggle = new PlayToggle(this);
    this.volumeControl = new VolumeControl(this);
    this.timeDisplay = new TimeDisplay(this);
    this.leftControls.appendChild(this.playToggle.button);
    this.leftControls.appendChild(this.volumeControl.container);
    this.leftControls.appendChild(this.timeDisplay.container);
    this.rightControls = createElement("div", { className: "sp-controls-right" });
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
    if (this.options.shortcuts) {
      this.shortcuts = new ShortcutsManager(this);
    }
  }
  _bindMediaEvents() {
    const v = this.video;
    v.addEventListener("play", () => {
      this.container.classList.add("sp-playing");
      this.container.classList.remove("sp-paused", "sp-ended");
      this.playToggle.setPlaying(true);
      this.bigPlayButton.hide();
      this.announcer.announce("Playing");
      this.emit("play");
    });
    v.addEventListener("pause", () => {
      this.container.classList.remove("sp-playing");
      this.container.classList.add("sp-paused");
      this.playToggle.setPlaying(false);
      this.showControls();
      this.announcer.announce("Paused");
      this.emit("pause");
    });
    v.addEventListener("ended", () => {
      this.container.classList.remove("sp-playing");
      this.container.classList.add("sp-ended");
      this.playToggle.setEnded();
      this.bigPlayButton.show();
      this.showControls();
      this.announcer.announce("Playback ended");
      this.emit("ended");
    });
    v.addEventListener("timeupdate", () => {
      const current = v.currentTime;
      const duration = v.duration || 0;
      const percent = duration > 0 ? current / duration * 100 : 0;
      this.progressBar.updateProgress(percent, current);
      this.timeDisplay.update(current, duration);
      this.emit("timeupdate", { currentTime: current, duration });
    });
    v.addEventListener("progress", () => {
      if (v.buffered.length > 0 && v.duration > 0) {
        const bufferedEnd = v.buffered.end(v.buffered.length - 1);
        const percent = bufferedEnd / v.duration * 100;
        this.progressBar.updateBuffered(percent);
      }
    });
    v.addEventListener("volumechange", () => {
      this.volumeControl.update(v.volume, v.muted);
      this.emit("volumechange", { volume: v.volume, muted: v.muted });
    });
    v.addEventListener("ratechange", () => {
      this.emit("ratechange", v.playbackRate);
    });
    v.addEventListener("waiting", () => {
      this.spinner.show();
      this.emit("waiting");
    });
    v.addEventListener("playing", () => {
      this.spinner.hide();
      this.emit("playing");
    });
    v.addEventListener("canplay", () => {
      this.spinner.hide();
      this.emit("canplay");
    });
    v.addEventListener("error", () => {
      this.spinner.hide();
      const err = v.error ? v.error.message : "Unknown playback error";
      this.errorDisplay.show(`Error: ${err}`);
      this.emit("error", err);
    });
    v.addEventListener("click", () => {
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
    this.container.addEventListener("mousemove", onActivity);
    this.container.addEventListener("touchstart", onActivity, { passive: true });
    this.container.addEventListener("mouseleave", () => {
      if (!this.video.paused && !this.settingsMenu.isOpen) {
        this.hideControls();
      }
    });
  }
  showControls() {
    this.container.classList.remove("sp-user-inactive");
  }
  hideControls() {
    if (this.settingsMenu && this.settingsMenu.isOpen) return;
    this.container.classList.add("sp-user-inactive");
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
      console.warn("[Sopplayer] Autoplay / play prevented:", err);
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
    this.announcer.announce(this.video.muted ? "Muted" : "Unmuted");
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
      tracks[i].mode = i === index ? "showing" : "disabled";
    }
    const active = this.activeTrackLabel;
    this.announcer.announce(`Subtitles: ${active || "Off"}`);
    this.emit("trackchange", index);
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
    const validThemes = ["default", "flamingo", "forest", "city", "sea", "fantasy", "minimal"];
    for (const t of validThemes) {
      this.container.classList.remove(`sp-theme-${t}`);
    }
    this.container.classList.add(`sp-theme-${themeName}`);
    this.options.theme = themeName;
    this.emit("themechange", themeName);
  }
  destroy() {
    clearTimeout(this._hideTimeout);
    if (this.shortcuts) this.shortcuts.destroy();
    if (this.fullscreenManager) this.fullscreenManager.destroy();
    if (this.pipManager) this.pipManager.destroy();
    if (this.announcer) this.announcer.destroy();
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
        if (t.kind === "subtitles" || t.kind === "captions") {
          tracks.push(t);
        }
      }
    }
    return tracks;
  }
  get activeTrackIndex() {
    const tracks = this.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].mode === "showing") return i;
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
  static initAll(selector = "video.sopplayer, video[data-sop-player]", options = {}) {
    const videos = document.querySelectorAll(selector);
    const players = [];
    videos.forEach((video) => {
      if (video._sopplayer) return;
      let inlineOpts = {};
      const dataSetup = video.getAttribute("data-setup");
      if (dataSetup) {
        try {
          inlineOpts = JSON.parse(dataSetup);
        } catch (e) {
        }
      }
      const player = new _Sopplayer(video, { ...inlineOpts, ...options });
      video._sopplayer = player;
      players.push(player);
    });
    return players;
  }
};
__publicField(_Sopplayer, "version", "2.0.0");
__publicField(_Sopplayer, "defaults", {
  theme: "default",
  autoplay: false,
  muted: false,
  controls: true,
  loop: false,
  preload: "metadata",
  volume: 1,
  playbackRate: 1,
  aspectRatio: "16:9",
  shortcuts: true,
  hideControlsDelay: 3e3
});
var Sopplayer = _Sopplayer;

// src/compatibility/v1Adapter.js
function createV1Adapter(target, options = {}, readyCallback) {
  let videoEl;
  if (typeof target === "string") {
    videoEl = document.getElementById(target) || document.querySelector(target);
  } else {
    videoEl = target;
  }
  if (!videoEl) {
    console.warn(`[Sopplayer v1 Compat] Target element not found: ${target}`);
    return null;
  }
  if (videoEl._sopplayerAdapter) {
    if (typeof readyCallback === "function") {
      readyCallback.call(videoEl._sopplayerAdapter);
    }
    return videoEl._sopplayerAdapter;
  }
  const modernPlayer = videoEl._sopplayer || new Sopplayer(videoEl, options);
  videoEl._sopplayer = modernPlayer;
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
      if (typeof seconds === "number") {
        modernPlayer.seek(seconds);
        return this;
      }
      return modernPlayer.currentTime;
    },
    duration() {
      return modernPlayer.duration;
    },
    volume(val) {
      if (typeof val === "number") {
        modernPlayer.setVolume(val);
        return this;
      }
      return modernPlayer.volume;
    },
    muted(val) {
      if (typeof val === "boolean") {
        modernPlayer.setMuted(val);
        return this;
      }
      return modernPlayer.muted;
    },
    playbackRate(rate) {
      if (typeof rate === "number") {
        modernPlayer.setSpeed(rate);
        return this;
      }
      return modernPlayer.playbackRate;
    },
    src(source) {
      if (source) {
        const url = typeof source === "string" ? source : source.src || "";
        const type = typeof source === "object" ? source.type : "";
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
      if (typeof fn === "function") {
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
  if (typeof readyCallback === "function") {
    adapter.ready(readyCallback);
  }
  return adapter;
}
function setupV1Globals(globalScope = window) {
  const vjs = function(id, options, ready) {
    return createV1Adapter(id, options, ready);
  };
  vjs.VERSION = "7.10.2";
  vjs.registerPlugin = function(name, pluginFn) {
    if (typeof pluginFn === "function") {
      pluginFn.call(vjs);
    }
  };
  vjs.mergeOptions = function(...args) {
    return Object.assign({}, ...args);
  };
  vjs.getComponent = function() {
    return null;
  };
  globalScope.videojs = vjs;
  globalScope.sopplayer = vjs;
  const autoInit = () => {
    Sopplayer.initAll("video.sopplayer, video.video-js, video[data-setup]");
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }
}

// src/index.js
if (typeof window !== "undefined") {
  window.Sopplayer = Sopplayer;
  setupV1Globals(window);
}
var index_default = Sopplayer;
export {
  Sopplayer,
  createV1Adapter,
  index_default as default,
  escapeHtml,
  formatTime,
  sanitizeUrl,
  setupV1Globals
};
//# sourceMappingURL=sopplayer.esm.js.map
