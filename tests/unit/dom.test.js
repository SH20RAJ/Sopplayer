import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatTime, clamp, escapeHtml, sanitizeUrl } from '../../src/core/dom.js';

describe('DOM & Security Utilities', () => {
  describe('formatTime', () => {
    test('formats seconds into MM:SS', () => {
      assert.equal(formatTime(0), '00:00');
      assert.equal(formatTime(5), '00:05');
      assert.equal(formatTime(65), '01:05');
      assert.equal(formatTime(599), '09:59');
    });

    test('formats hours when duration exceeds 3600s', () => {
      assert.equal(formatTime(3600), '01:00:00');
      assert.equal(formatTime(3665), '01:01:05');
      assert.equal(formatTime(7325), '02:02:05');
    });

    test('handles negative and non-numeric inputs gracefully', () => {
      assert.equal(formatTime(-10), '00:00');
      assert.equal(formatTime(NaN), '00:00');
      assert.equal(formatTime(Infinity), '00:00');
    });
  });

  describe('clamp', () => {
    test('clamps values between min and max', () => {
      assert.equal(clamp(0.5, 0, 1), 0.5);
      assert.equal(clamp(-1, 0, 1), 0);
      assert.equal(clamp(1.5, 0, 1), 1);
      assert.equal(clamp(50, 10, 100), 50);
      assert.equal(clamp(5, 10, 100), 10);
      assert.equal(clamp(150, 10, 100), 100);
    });
  });

  describe('escapeHtml', () => {
    test('escapes HTML special characters', () => {
      assert.equal(escapeHtml('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      assert.equal(escapeHtml("Tom & Jerry's"), 'Tom &amp; Jerry&#039;s');
      assert.equal(escapeHtml(null), '');
      assert.equal(escapeHtml(undefined), '');
    });
  });

  describe('sanitizeUrl', () => {
    test('permits valid web and media protocols', () => {
      assert.equal(sanitizeUrl('https://example.com/video.mp4'), 'https://example.com/video.mp4');
      assert.equal(sanitizeUrl('http://example.com/video.mp4'), 'http://example.com/video.mp4');
      assert.equal(sanitizeUrl('sample.mp4'), 'sample.mp4');
      assert.equal(sanitizeUrl('/media/sample.mp4'), '/media/sample.mp4');
      assert.equal(sanitizeUrl('blob:https://example.com/uuid'), 'blob:https://example.com/uuid');
    });

    test('blocks malicious and dangerous pseudo-protocols', () => {
      assert.equal(sanitizeUrl('javascript:alert(1)'), '');
      assert.equal(sanitizeUrl('JAVASCRIPT:alert(1)'), '');
      assert.equal(sanitizeUrl('vbscript:msgbox(1)'), '');
      assert.equal(sanitizeUrl('data:text/html;base64,PHNjcmlwdD4='), '');
      assert.equal(sanitizeUrl('data:application/javascript,alert(1)'), '');
    });
  });
});
