/**
 * Sopplayer v2.0 - Fullscreen API Wrapper
 */

export class FullscreenManager {
  constructor(element, onChange) {
    this.element = element;
    this.onChange = onChange;
    this._handleFullscreenChange = this._handleFullscreenChange.bind(this);

    document.addEventListener('fullscreenchange', this._handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this._handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this._handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this._handleFullscreenChange);
  }

  _handleFullscreenChange() {
    if (this.onChange) {
      this.onChange(this.isFullscreen());
    }
  }

  isSupported() {
    return Boolean(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

  isFullscreen() {
    return Boolean(
      document.fullscreenElement === this.element ||
      document.webkitFullscreenElement === this.element ||
      document.mozFullScreenElement === this.element ||
      document.msFullscreenElement === this.element
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
      console.warn('[Sopplayer] Fullscreen request error:', err);
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
      console.warn('[Sopplayer] Fullscreen exit error:', err);
      return false;
    }
  }

  toggle() {
    return this.isFullscreen() ? this.exit() : this.request();
  }

  destroy() {
    document.removeEventListener('fullscreenchange', this._handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this._handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this._handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this._handleFullscreenChange);
  }
}
