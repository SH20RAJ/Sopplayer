import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from '../../src/core/EventEmitter.js';

describe('EventEmitter', () => {
  test('should register and trigger event listeners', () => {
    const emitter = new EventEmitter();
    let called = false;
    let receivedArg = null;

    emitter.on('test-event', (arg) => {
      called = true;
      receivedArg = arg;
    });

    emitter.emit('test-event', 'hello-world');
    assert.equal(called, true);
    assert.equal(receivedArg, 'hello-world');
  });

  test('should support once listeners that fire only once', () => {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.once('single-event', () => {
      count++;
    });

    emitter.emit('single-event');
    emitter.emit('single-event');
    assert.equal(count, 1);
  });

  test('should remove event listeners with off()', () => {
    const emitter = new EventEmitter();
    let count = 0;
    const handler = () => { count++; };

    emitter.on('custom', handler);
    emitter.emit('custom');
    assert.equal(count, 1);

    emitter.off('custom', handler);
    emitter.emit('custom');
    assert.equal(count, 1);
  });

  test('should isolate errors in event handlers', () => {
    const emitter = new EventEmitter();
    let secondCalled = false;

    emitter.on('error-test', () => {
      throw new Error('Boom');
    });
    emitter.on('error-test', () => {
      secondCalled = true;
    });

    // Should not throw, should continue to subsequent handlers
    assert.doesNotThrow(() => {
      emitter.emit('error-test');
    });
    assert.equal(secondCalled, true);
  });
});
