/**
 * Sopplayer v2.0 - Settings Menu Component
 * Manages playback speed, subtitles/captions, loop mode, and shortcuts modal
 */

import { createElement } from '../core/dom.js';
import { icons } from './icons.js';

export class SettingsMenu {
  constructor(player) {
    this.player = player;
    this.isOpen = false;
    this.currentSubmenu = null; // 'speed' | 'captions' | null

    this.container = createElement('div', { className: 'sp-settings-container' });

    this.toggleButton = createElement('button', {
      className: 'sp-button sp-settings-toggle',
      attrs: {
        type: 'button',
        'aria-label': 'Settings',
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
        title: 'Settings'
      },
      html: icons.settings,
      events: {
        click: (e) => {
          e.stopPropagation();
          this.toggle();
        }
      }
    });

    this.menu = createElement('div', {
      className: 'sp-settings-menu sp-hidden',
      attrs: { role: 'menu', 'aria-label': 'Player settings' },
      events: {
        click: (e) => e.stopPropagation()
      }
    });

    this.container.appendChild(this.toggleButton);
    this.container.appendChild(this.menu);

    // Close when clicking outside
    document.addEventListener('click', () => {
      if (this.isOpen) this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.currentSubmenu = null;
    this.menu.classList.remove('sp-hidden');
    this.toggleButton.setAttribute('aria-expanded', 'true');
    this.renderMainMenu();
  }

  close() {
    this.isOpen = false;
    this.currentSubmenu = null;
    this.menu.classList.add('sp-hidden');
    this.toggleButton.setAttribute('aria-expanded', 'false');
  }

  renderMainMenu() {
    this.menu.innerHTML = '';

    // Speed option
    const currentSpeed = `${this.player.playbackRate}x`;
    const speedItem = this._createMenuItem({
      label: 'Playback Speed',
      value: currentSpeed === '1x' ? 'Normal' : currentSpeed,
      onClick: () => this.renderSpeedSubmenu()
    });

    // Subtitles option
    const tracks = this.player.textTracks;
    if (tracks && tracks.length > 0) {
      const activeTrack = this.player.activeTrackLabel || 'Off';
      const captionsItem = this._createMenuItem({
        label: 'Subtitles',
        value: activeTrack,
        onClick: () => this.renderCaptionsSubmenu()
      });
      this.menu.appendChild(captionsItem);
    }

    // Loop option
    const loopItem = this._createToggleItem({
      label: 'Loop Video',
      checked: Boolean(this.player.video.loop),
      onToggle: (checked) => {
        this.player.video.loop = checked;
        this.renderMainMenu();
      }
    });

    // Keyboard Shortcuts item
    const shortcutsItem = this._createMenuItem({
      label: 'Keyboard Shortcuts',
      value: '?',
      onClick: () => {
        this.close();
        this.player.toggleShortcuts();
      }
    });

    this.menu.appendChild(speedItem);
    this.menu.appendChild(loopItem);
    this.menu.appendChild(shortcutsItem);
  }

  renderSpeedSubmenu() {
    this.menu.innerHTML = '';

    const backItem = this._createSubmenuHeader('Playback Speed', () => this.renderMainMenu());
    this.menu.appendChild(backItem);

    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    for (const rate of speeds) {
      const isSelected = this.player.playbackRate === rate;
      const label = rate === 1 ? 'Normal' : `${rate}x`;

      const item = createElement('button', {
        className: `sp-menu-item sp-radio-item ${isSelected ? 'sp-selected' : ''}`,
        attrs: { role: 'menuitemradio', 'aria-checked': isSelected.toString(), type: 'button' },
        html: `<span>${label}</span>${isSelected ? icons.check : ''}`,
        events: {
          click: () => {
            this.player.setSpeed(rate);
            this.close();
          }
        }
      });
      this.menu.appendChild(item);
    }
  }

  renderCaptionsSubmenu() {
    this.menu.innerHTML = '';

    const backItem = this._createSubmenuHeader('Subtitles / Captions', () => this.renderMainMenu());
    this.menu.appendChild(backItem);

    const isOff = this.player.activeTrackIndex === -1;
    const offItem = createElement('button', {
      className: `sp-menu-item sp-radio-item ${isOff ? 'sp-selected' : ''}`,
      attrs: { role: 'menuitemradio', 'aria-checked': isOff.toString(), type: 'button' },
      html: `<span>Off</span>${isOff ? icons.check : ''}`,
      events: {
        click: () => {
          this.player.setTrack(-1);
          this.close();
        }
      }
    });
    this.menu.appendChild(offItem);

    const tracks = this.player.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const isSelected = this.player.activeTrackIndex === i;
      const track = tracks[i];
      const label = track.label || track.language || `Track ${i + 1}`;

      const item = createElement('button', {
        className: `sp-menu-item sp-radio-item ${isSelected ? 'sp-selected' : ''}`,
        attrs: { role: 'menuitemradio', 'aria-checked': isSelected.toString(), type: 'button' },
        html: `<span>${label}</span>${isSelected ? icons.check : ''}`,
        events: {
          click: () => {
            this.player.setTrack(i);
            this.close();
          }
        }
      });
      this.menu.appendChild(item);
    }
  }

  _createMenuItem({ label, value, onClick }) {
    return createElement('button', {
      className: 'sp-menu-item',
      attrs: { role: 'menuitem', type: 'button' },
      html: `
        <span class="sp-menu-label">${label}</span>
        <span class="sp-menu-value">${value} &rsaquo;</span>
      `,
      events: { click: onClick }
    });
  }

  _createToggleItem({ label, checked, onToggle }) {
    const item = createElement('button', {
      className: 'sp-menu-item sp-toggle-item',
      attrs: { role: 'menuitemcheckbox', 'aria-checked': checked.toString(), type: 'button' },
      html: `
        <span class="sp-menu-label">${label}</span>
        <span class="sp-menu-switch ${checked ? 'sp-switch-on' : ''}"></span>
      `,
      events: {
        click: () => onToggle(!checked)
      }
    });
    return item;
  }

  _createSubmenuHeader(title, onBack) {
    return createElement('button', {
      className: 'sp-menu-item sp-menu-header',
      attrs: { role: 'menuitem', type: 'button' },
      html: `
        <span class="sp-menu-back">&lsaquo;</span>
        <span class="sp-menu-title">${title}</span>
      `,
      events: { click: onBack }
    });
  }
}
