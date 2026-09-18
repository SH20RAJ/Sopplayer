/**
 * Sopplayer v2.0 - Fullscreen & Picture-in-Picture Controls
 */

import { createElement } from '../core/dom.js';
import { icons } from './icons.js';

export class FullscreenToggle {
  constructor(player) {
    this.player = player;

    this.button = createElement('button', {
      className: 'sp-button sp-fullscreen-toggle',
      attrs: {
        type: 'button',
        'aria-label': 'Fullscreen',
        title: 'Fullscreen (f)'
      },
      html: icons.fullscreenEnter,
      events: {
        click: () => this.player.toggleFullscreen()
      }
    });
  }

  update(isFullscreen) {
    this.button.innerHTML = isFullscreen ? icons.fullscreenExit : icons.fullscreenEnter;
    this.button.setAttribute('aria-label', isFullscreen ? 'Exit Fullscreen' : 'Fullscreen');
    this.button.setAttribute('title', isFullscreen ? 'Exit Fullscreen (f)' : 'Fullscreen (f)');
  }
}

export class PipToggle {
  constructor(player) {
    this.player = player;

    this.button = createElement('button', {
      className: 'sp-button sp-pip-toggle',
      attrs: {
        type: 'button',
        'aria-label': 'Picture-in-Picture',
        title: 'Picture-in-Picture (p)'
      },
      html: icons.pip,
      events: {
        click: () => this.player.togglePip()
      }
    });
  }

  update(isPip) {
    this.button.classList.toggle('sp-active', isPip);
  }
}
