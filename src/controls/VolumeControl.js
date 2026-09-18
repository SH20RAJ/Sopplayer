/**
 * Sopplayer v2.0 - Volume Control & Mute Toggle Component
 */

import { createElement, clamp } from '../core/dom.js';
import { icons } from './icons.js';

export class VolumeControl {
  constructor(player) {
    this.player = player;
    this.isDragging = false;

    this.container = createElement('div', { className: 'sp-volume-control' });

    this.muteButton = createElement('button', {
      className: 'sp-button sp-mute-toggle',
      attrs: {
        type: 'button',
        'aria-label': 'Mute',
        title: 'Mute (m)'
      },
      html: icons.volumeHigh,
      events: {
        click: () => this.player.toggleMute()
      }
    });

    this.sliderContainer = createElement('div', {
      className: 'sp-volume-slider-container',
      attrs: {
        role: 'slider',
        'aria-label': 'Volume',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuenow': '100',
        'aria-valuetext': '100%',
        tabindex: '0'
      }
    });

    this.track = createElement('div', { className: 'sp-volume-track' });
    this.filled = createElement('div', { className: 'sp-volume-filled' });
    this.thumb = createElement('div', { className: 'sp-volume-thumb' });

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
      this.sliderContainer.classList.add('sp-is-dragging');
      onMove(e);

      const onEnd = () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.sliderContainer.classList.remove('sp-is-dragging');
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onEnd);
          window.removeEventListener('touchmove', onMove);
          window.removeEventListener('touchend', onEnd);
        }
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('touchend', onEnd);
    };

    this.sliderContainer.addEventListener('mousedown', onStart);
    this.sliderContainer.addEventListener('touchstart', onStart, { passive: true });

    // Keyboard support
    this.sliderContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.player.setVolume(Math.max(0, this.player.volume - 0.05));
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.player.setVolume(Math.min(1, this.player.volume + 0.05));
      }
    });

    // Mouse wheel support over volume control
    this.container.addEventListener('wheel', (e) => {
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

    this.sliderContainer.setAttribute('aria-valuenow', percent.toString());
    this.sliderContainer.setAttribute('aria-valuetext', `${percent}%`);

    if (muted || effectiveVol === 0) {
      this.muteButton.innerHTML = icons.volumeMute;
      this.muteButton.setAttribute('aria-label', 'Unmute');
      this.muteButton.setAttribute('title', 'Unmute (m)');
    } else if (effectiveVol < 0.5) {
      this.muteButton.innerHTML = icons.volumeLow;
      this.muteButton.setAttribute('aria-label', 'Mute');
      this.muteButton.setAttribute('title', 'Mute (m)');
    } else {
      this.muteButton.innerHTML = icons.volumeHigh;
      this.muteButton.setAttribute('aria-label', 'Mute');
      this.muteButton.setAttribute('title', 'Mute (m)');
    }
  }
}
