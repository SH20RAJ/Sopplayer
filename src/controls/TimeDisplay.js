/**
 * Sopplayer v2.0 - Time Display Component
 * Shows current time / total duration, supports toggle to countdown
 */

import { createElement, formatTime } from '../core/dom.js';

export class TimeDisplay {
  constructor(player) {
    this.player = player;
    this.showRemaining = false;

    this.container = createElement('div', {
      className: 'sp-time-display',
      attrs: {
        'aria-label': 'Playback time',
        title: 'Click to toggle remaining time'
      },
      events: {
        click: () => {
          this.showRemaining = !this.showRemaining;
          this.update(this.player.currentTime, this.player.duration);
        }
      }
    });

    this.currentSpan = createElement('span', { className: 'sp-time-current', text: '00:00' });
    this.separator = createElement('span', { className: 'sp-time-separator', text: '/' });
    this.durationSpan = createElement('span', { className: 'sp-time-duration', text: '00:00' });

    this.container.appendChild(this.currentSpan);
    this.container.appendChild(this.separator);
    this.container.appendChild(this.durationSpan);
  }

  update(current, duration) {
    const forceHours = (duration || 0) >= 3600;
    if (this.showRemaining) {
      const remaining = Math.max(0, (duration || 0) - (current || 0));
      this.currentSpan.textContent = `-${formatTime(remaining, forceHours)}`;
      this.separator.style.display = 'none';
      this.durationSpan.style.display = 'none';
    } else {
      this.currentSpan.textContent = formatTime(current || 0, forceHours);
      this.separator.style.display = 'inline';
      this.durationSpan.style.display = 'inline';
      this.durationSpan.textContent = formatTime(duration || 0, forceHours);
    }
  }
}
