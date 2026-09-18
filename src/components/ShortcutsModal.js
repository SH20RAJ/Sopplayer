/**
 * Sopplayer v2.0 - Keyboard Shortcuts Help Modal
 */

import { createElement } from '../core/dom.js';
import { icons } from '../controls/icons.js';

export class ShortcutsModal {
  constructor(player) {
    this.player = player;

    this.element = createElement('div', {
      className: 'sp-modal-backdrop sp-hidden',
      attrs: {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'sp-shortcuts-title'
      },
      events: {
        click: (e) => {
          if (e.target === this.element) this.close();
        }
      }
    });

    const modal = createElement('div', { className: 'sp-modal-content' });

    const header = createElement('div', {
      className: 'sp-modal-header',
      html: `
        <h3 id="sp-shortcuts-title" class="sp-modal-title">Keyboard Shortcuts</h3>
      `
    });

    const closeBtn = createElement('button', {
      className: 'sp-modal-close',
      attrs: { type: 'button', 'aria-label': 'Close shortcuts modal' },
      html: icons.close,
      events: {
        click: () => this.close()
      }
    });
    header.appendChild(closeBtn);

    const list = createElement('div', {
      className: 'sp-shortcuts-grid',
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
    this.element.classList.contains('sp-hidden') ? this.open() : this.close();
  }

  open() {
    this.element.classList.remove('sp-hidden');
    const closeBtn = this.element.querySelector('.sp-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  close() {
    this.element.classList.add('sp-hidden');
    this.player.container.focus();
  }
}
