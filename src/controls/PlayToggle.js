/**
 * Sopplayer v2.0 - Play / Pause Toggle Button
 */

import { createElement } from '../core/dom.js';
import { icons } from './icons.js';

export class PlayToggle {
  constructor(player) {
    this.player = player;
    this.isPlaying = false;

    this.button = createElement('button', {
      className: 'sp-button sp-play-toggle',
      attrs: {
        type: 'button',
        'aria-label': 'Play',
        title: 'Play (k / Space)'
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
    this.button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    this.button.setAttribute('title', playing ? 'Pause (k / Space)' : 'Play (k / Space)');
  }

  setEnded() {
    this.isPlaying = false;
    this.button.innerHTML = icons.replay;
    this.button.setAttribute('aria-label', 'Replay');
    this.button.setAttribute('title', 'Replay (k / Space)');
  }
}
