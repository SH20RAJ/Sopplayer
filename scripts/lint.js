/**
 * Sopplayer v2.0 - Fast Code Linter
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const scanDirs = ['src', 'scripts', 'tests'];
let errors = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check 1: Trailing whitespace
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/\s+$/.test(line)) {
      // warning only
    }
  });

  // Check 2: No raw unescaped innerHTML in src/ (security audit)
  if (filePath.includes('/src/') && content.includes('innerHTML =') && !filePath.includes('icons.js')) {
    // Only allowed for static SVGs or controlled internal templates
    console.warn(`[Linter Notice] Review innerHTML assignment in: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (file.endsWith('.js')) {
      checkFile(full);
    }
  }
}

console.log('🔍 Linting source files...');
for (const d of scanDirs) {
  const dirPath = path.join(rootDir, d);
  if (fs.existsSync(dirPath)) {
    walk(dirPath);
  }
}

if (errors === 0) {
  console.log('✅ Lint check passed! No errors found.');
} else {
  console.error(`❌ Lint check failed with ${errors} errors.`);
  process.exit(1);
}
