import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

describe('Build Artifacts & Legacy Compatibility Verification', () => {
  test('verifies modern dist files exist and are populated', () => {
    const expectedDist = [
      'dist/sopplayer.js',
      'dist/sopplayer.min.js',
      'dist/sopplayer.esm.js',
      'dist/sopplayer.css',
      'dist/sopplayer.min.css',
      'dist/sopplayer.d.ts'
    ];

    for (const relPath of expectedDist) {
      const fullPath = path.join(rootDir, relPath);
      assert.equal(fs.existsSync(fullPath), true, `Missing file: ${relPath}`);
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 100, `File too small or empty: ${relPath}`);
    }
  });

  test('verifies root compatibility files exist for historical CDN endpoints', () => {
    const expectedRoot = [
      'sopplayer.js',
      'sopplayer.min.js',
      'sopplayer.css',
      'sopplayer.min.css',
      'sample.mp4',
      'sample.png'
    ];

    for (const relPath of expectedRoot) {
      const fullPath = path.join(rootDir, relPath);
      assert.equal(fs.existsSync(fullPath), true, `Missing legacy root file: ${relPath}`);
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 0, `File empty: ${relPath}`);
    }
  });

  test('verifies generated missing legacy skin files exist', () => {
    const legacySkins = [
      'flamingo/sp-flamingo.min.js',
      'dtube/dtube.min.js',
      'dtube/dtube.min.css',
      'Default/videojs.css'
    ];

    for (const relPath of legacySkins) {
      const fullPath = path.join(rootDir, relPath);
      assert.equal(fs.existsSync(fullPath), true, `Missing legacy skin file: ${relPath}`);
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 0, `File empty: ${relPath}`);
    }
  });
});
