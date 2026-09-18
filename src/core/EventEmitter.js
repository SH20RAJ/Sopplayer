/**
 * Sopplayer v2.0 - EventEmitter
 * Lightweight, high-performance typed event bus
 */

export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }

  on(event, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError(`Event handler for "${event}" must be a function`);
    }
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  once(event, handler) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      handler.apply(this, args);
    };
    wrapper._original = handler;
    return this.on(event, wrapper);
  }

  off(event, handler) {
    if (!this._listeners.has(event)) return this;
    if (!handler) {
      this._listeners.delete(event);
      return this;
    }
    const set = this._listeners.get(event);
    for (const item of set) {
      if (item === handler || item._original === handler) {
        set.delete(item);
        break;
      }
    }
    if (set.size === 0) {
      this._listeners.delete(event);
    }
    return this;
  }

  emit(event, ...args) {
    if (!this._listeners.has(event)) return false;
    const listeners = Array.from(this._listeners.get(event));
    for (let i = 0; i < listeners.length; i++) {
      try {
        listeners[i].apply(this, args);
      } catch (err) {
        console.error(`[Sopplayer] Error in event handler for "${event}":`, err);
      }
    }
    return true;
  }

  removeAllListeners() {
    this._listeners.clear();
    return this;
  }
}
