/**
 * Sopplayer v2.0 - Center Big Play Button
 * Modern glassmorphic centered play button with subtle pulse
 */

import { createElement } from '../core/dom.js';
import { icons } from '../controls/icons.js';

export class BigPlayButton {
  constructor(player) {
    this.player = player;

    this.element = createElement('button', {
      className: 'sp-big-play-btn',
      attrs: {
        type: 'button',
        'aria-label': 'Play video',
        title: 'Play'
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
    this.element.classList.add('sp-hidden');
  }

  show() {
    this.element.classList.remove('sp-hidden');
  }
}
