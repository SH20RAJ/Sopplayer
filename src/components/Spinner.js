/**
 * Sopplayer v2.0 - Buffering / Loading Spinner
 */

import { createElement } from '../core/dom.js';
import { icons } from '../controls/icons.js';

export class Spinner {
  constructor() {
    this.element = createElement('div', {
      className: 'sp-spinner sp-hidden',
      attrs: { 'aria-label': 'Buffering video', role: 'status' },
      html: icons.spinner
    });
  }

  show() {
    this.element.classList.remove('sp-hidden');
  }

  hide() {
    this.element.classList.add('sp-hidden');
  }
}
