/**
 * Sopplayer v2.0 - DOM Utilities & Security Sanitizers
 */

/**
 * Validates and sanitizes a media or poster URL to prevent XSS (e.g. javascript: URLs)
 * @param {string} url 
 * @returns {string} Safe sanitized URL, or empty string if unsafe
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Prohibit dangerous pseudo-protocols
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('data:text/html') ||
    lower.startsWith('data:application/javascript')
  ) {
    console.warn(`[Sopplayer Security] Blocked potentially unsafe URL: ${trimmed}`);
    return '';
  }

  return trimmed;
}

/**
 * Escapes plain text for safe insertion into HTML strings
 * @param {string} text 
 * @returns {string} HTML-escaped string
 */
export function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats time in seconds to HH:MM:SS or MM:SS
 * @param {number} seconds 
 * @param {boolean} forceHours 
 * @returns {string} Formatted time string
 */
export function formatTime(seconds, forceHours = false) {
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
    return forceHours ? '00:00:00' : '00:00';
  }

  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);

  const pad = (n) => String(n).padStart(2, '0');

  if (h > 0 || forceHours) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}

/**
 * Clamps a number between min and max
 */
export function clamp(val, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Safely creates an element with attributes, classes, and event listeners
 * Avoids raw innerHTML with user input
 */
export function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  if (options.className) {
    el.className = options.className;
  }

  if (options.text !== undefined && options.text !== null) {
    el.textContent = options.text;
  }

  if (options.html) {
    // Only used with static trusted SVG / templates
    el.innerHTML = options.html;
  }

  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value !== undefined && value !== null && value !== false) {
        el.setAttribute(key, value === true ? '' : String(value));
      }
    }
  }

  if (options.events) {
    for (const [event, handler] of Object.entries(options.events)) {
      el.addEventListener(event, handler);
    }
  }

  if (options.children && Array.isArray(options.children)) {
    for (const child of options.children) {
      if (child instanceof Node) {
        el.appendChild(child);
      }
    }
  }

  return el;
}

/**
 * Checks if device is mobile / touch
 */
export function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
