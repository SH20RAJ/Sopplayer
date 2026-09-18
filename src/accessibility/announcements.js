/**
 * Sopplayer v2.0 - Accessibility Screen Reader Announcements
 */

export class Announcer {
  constructor(container) {
    this.el = document.createElement('div');
    this.el.className = 'sp-sr-only';
    this.el.setAttribute('aria-live', 'polite');
    this.el.setAttribute('aria-atomic', 'true');
    container.appendChild(this.el);
  }

  announce(message) {
    if (!message) return;
    // Clearing first ensures screen readers announce repeated phrases
    this.el.textContent = '';
    setTimeout(() => {
      this.el.textContent = message;
    }, 50);
  }

  destroy() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}
