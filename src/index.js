/**
 * Sopplayer v2.0 - Main Library Entry Point
 * Modern, Accessible, Responsive HTML5 Video Player
 */

import { Sopplayer } from './core/Sopplayer.js';
import { createV1Adapter, setupV1Globals } from './compatibility/v1Adapter.js';
import { formatTime, sanitizeUrl, escapeHtml } from './core/dom.js';

// Auto-register in browser global window
if (typeof window !== 'undefined') {
  window.Sopplayer = Sopplayer;
  setupV1Globals(window);
}

export {
  Sopplayer,
  createV1Adapter,
  setupV1Globals,
  formatTime,
  sanitizeUrl,
  escapeHtml
};

export default Sopplayer;
