/**
 * Sopplayer v2.0 - Keyboard Shortcuts Manager
 */

export class ShortcutsManager {
  constructor(player) {
    this.player = player;
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.enabled = true;

    // Listen on the player container or window
    this.player.container.addEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown(e) {
    if (!this.enabled) return;

    // Do not intercept if user is typing in form controls
    const active = document.activeElement;
    if (active) {
      const tag = active.tagName.toLowerCase();
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        active.isContentEditable
      ) {
        return;
      }
    }

    // Ignore if modified keys are pressed (Ctrl, Meta, Alt) except Shift + / for ?
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    let handled = true;

    switch (e.key) {
      case ' ':
      case 'k':
      case 'K':
        e.preventDefault();
        this.player.togglePlay();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.player.rewind(e.shiftKey ? 10 : 5);
        break;

      case 'ArrowRight':
        e.preventDefault();
        this.player.forward(e.shiftKey ? 10 : 5);
        break;

      case 'j':
      case 'J':
        e.preventDefault();
        this.player.rewind(10);
        break;

      case 'l':
      case 'L':
        e.preventDefault();
        this.player.forward(10);
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.player.setVolume(Math.min(1, this.player.volume + 0.1));
        break;

      case 'ArrowDown':
        e.preventDefault();
        this.player.setVolume(Math.max(0, this.player.volume - 0.1));
        break;

      case 'm':
      case 'M':
        e.preventDefault();
        this.player.toggleMute();
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        this.player.toggleFullscreen();
        break;

      case 'p':
      case 'P':
        e.preventDefault();
        this.player.togglePip();
        break;

      case 'c':
      case 'C':
        e.preventDefault();
        this.player.toggleCaptions();
        break;

      case '?':
        e.preventDefault();
        this.player.toggleShortcuts();
        break;

      case 'Escape':
        this.player.closeAllMenus();
        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
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
    this.player.container.removeEventListener('keydown', this._handleKeyDown);
  }
}
