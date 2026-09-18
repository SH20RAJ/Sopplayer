/**
 * Sopplayer v2.0 - Interactive Progress Bar & Scrubber
 * Supports drag-scrubbing, hover time preview, buffered bar, and ARIA slider
 */

import { createElement, formatTime, clamp } from '../core/dom.js';

export class ProgressBar {
  constructor(player) {
    this.player = player;
    this.isDragging = false;

    this._initElements();
    this._bindEvents();
  }

  _initElements() {
    this.container = createElement('div', {
      className: 'sp-progress-container',
      attrs: {
        role: 'slider',
        'aria-label': 'Seek slider',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuenow': '0',
        'aria-valuetext': '00:00',
        tabindex: '0'
      }
    });

    this.track = createElement('div', { className: 'sp-progress-track' });
    this.buffered = createElement('div', { className: 'sp-progress-buffered' });
    this.playProgress = createElement('div', { className: 'sp-progress-played' });
    this.thumb = createElement('div', { className: 'sp-progress-thumb' });
    this.hoverPreview = createElement('div', { className: 'sp-progress-hover' });
    this.tooltip = createElement('div', { className: 'sp-progress-tooltip', text: '00:00' });

    this.track.appendChild(this.buffered);
    this.track.appendChild(this.hoverPreview);
    this.track.appendChild(this.playProgress);
    this.track.appendChild(this.thumb);

    this.container.appendChild(this.track);
    this.container.appendChild(this.tooltip);
  }

  _bindEvents() {
    const onMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);

      // Tooltip position & content
      const duration = this.player.duration || 0;
      const hoverTime = ratio * duration;
      this.tooltip.textContent = formatTime(hoverTime);
      this.tooltip.style.left = `${ratio * 100}%`;
      this.hoverPreview.style.width = `${ratio * 100}%`;

      if (this.isDragging) {
        this.player.seek(hoverTime);
        this.updateProgress(ratio * 100, hoverTime);
      }
    };

    const onStart = (e) => {
      this.isDragging = true;
      this.container.classList.add('sp-is-scrubbing');
      onMove(e);

      const onEnd = () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.container.classList.remove('sp-is-scrubbing');
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

    this.container.addEventListener('mousedown', onStart);
    this.container.addEventListener('touchstart', onStart, { passive: true });

    this.container.addEventListener('mousemove', (e) => {
      if (!this.isDragging) onMove(e);
    });

    this.container.addEventListener('mouseleave', () => {
      if (!this.isDragging) {
        this.hoverPreview.style.width = '0%';
      }
    });

    // Keyboard controls for a11y slider
    this.container.addEventListener('keydown', (e) => {
      const step = 5; // 5 seconds
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.player.rewind(step);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.player.forward(step);
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.player.seek(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.player.seek(this.player.duration);
      }
    });
  }

  updateProgress(percent, currentTime) {
    if (this.isDragging) return;
    const p = clamp(percent, 0, 100);
    this.playProgress.style.width = `${p}%`;
    this.thumb.style.left = `${p}%`;

    this.container.setAttribute('aria-valuenow', Math.round(p).toString());
    this.container.setAttribute('aria-valuetext', formatTime(currentTime));
  }

  updateBuffered(bufferedPercent) {
    const p = clamp(bufferedPercent, 0, 100);
    this.buffered.style.width = `${p}%`;
  }
}
