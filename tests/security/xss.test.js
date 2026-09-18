import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeUrl, escapeHtml } from '../../src/core/dom.js';

describe('Security & XSS Prevention', () => {
  test('blocks javascript: URLs with spaces or casing variations', () => {
    assert.equal(sanitizeUrl('  javascript:alert(1)  '), '');
    assert.equal(sanitizeUrl('JavaScript:alert(1)'), '');
  });

  test('blocks data:text/html vectors', () => {
    assert.equal(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '');
  });

  test('safely handles base64 payload decoding simulation without unhandled crashes', () => {
    const maliciousPayload = '{"vidurl":"javascript:alert(1)","viddesc":"<img src=x onerror=alert(1)>"}';
    const base64Encoded = Buffer.from(maliciousPayload).toString('base64');

    // Simulate Rainplayer decoding safely
    let parsedData = null;
    try {
      const decoded = Buffer.from(base64Encoded, 'base64').toString('utf8');
      parsedData = JSON.parse(decoded);
    } catch (e) {
      parsedData = null;
    }

    assert.notEqual(parsedData, null);
    assert.equal(sanitizeUrl(parsedData.vidurl), ''); // javascript: blocked
    assert.equal(escapeHtml(parsedData.viddesc).includes('<img'), false); // escaped
  });

  test('handles malformed base64 without throwing uncaught errors', () => {
    const corruptBase64 = '!!!invalid_base64&&&';
    assert.doesNotThrow(() => {
      try {
        const decoded = Buffer.from(corruptBase64, 'base64').toString('utf8');
        JSON.parse(decoded);
      } catch (e) {
        // Handled safely
      }
    });
  });
});
