/**
 * Sopplayer v2.0 - Accessible Error Display
 */

import { createElement, escapeHtml } from '../core/dom.js';

export class ErrorDisplay {
  constructor(player) {
    this.player = player;

    this.element = createElement('div', {
      className: 'sp-error-display sp-hidden',
      attrs: { role: 'alert', 'aria-live': 'assertive' }
    });

    this.message = createElement('div', { className: 'sp-error-message' });
    this.retryBtn = createElement('button', {
      className: 'sp-error-retry',
      text: 'Retry Playback',
      attrs: { type: 'button' },
      events: {
        click: (e) => {
          e.stopPropagation();
          this.hide();
          this.player.video.load();
          this.player.play().catch(() => {});
        }
      }
    });

    this.element.appendChild(this.message);
    this.element.appendChild(this.retryBtn);
  }

  show(text) {
    this.message.textContent = text || 'The media playback was interrupted or the format is not supported.';
    this.element.classList.remove('sp-hidden');
  }

  hide() {
    this.element.classList.add('sp-hidden');
  }
}
