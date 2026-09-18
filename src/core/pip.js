/**
 * Sopplayer v2.0 - Picture-in-Picture Manager
 */

export class PipManager {
  constructor(videoElement, onChange) {
    this.video = videoElement;
    this.onChange = onChange;
    this._handleEnter = this._handleEnter.bind(this);
    this._handleLeave = this._handleLeave.bind(this);

    this.video.addEventListener('enterpictureinpicture', this._handleEnter);
    this.video.addEventListener('leavepictureinpicture', this._handleLeave);
  }

  _handleEnter() {
    if (this.onChange) this.onChange(true);
  }

  _handleLeave() {
    if (this.onChange) this.onChange(false);
  }

  isSupported() {
    return Boolean(
      document.pictureInPictureEnabled ||
      (this.video.webkitSupportsPresentationMode &&
        typeof this.video.webkitSetPresentationMode === 'function')
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
        this.video.webkitSetPresentationMode('picture-in-picture');
        return true;
      }
    } catch (err) {
      console.warn('[Sopplayer] PiP request error:', err);
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
        this.video.webkitSetPresentationMode('inline');
        return true;
      }
    } catch (err) {
      console.warn('[Sopplayer] PiP exit error:', err);
      return false;
    }
    return false;
  }

  toggle() {
    return this.isPip() ? this.exit() : this.request();
  }

  destroy() {
    this.video.removeEventListener('enterpictureinpicture', this._handleEnter);
    this.video.removeEventListener('leavepictureinpicture', this._handleLeave);
  }
}
