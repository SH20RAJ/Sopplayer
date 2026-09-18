import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BUDGETS = [
  { file: 'dist/sopplayer.min.js', maxBytes: 45 * 1024, targetBytes: 40 * 1024 },
  { file: 'dist/sopplayer.min.css', maxBytes: 20 * 1024, targetBytes: 16 * 1024 },
  { file: 'dist/sopplayer.esm.js', maxBytes: 65 * 1024, targetBytes: 60 * 1024 }
];

console.log('📦 Measuring bundle sizes and verifying budgets...\n');
console.log('| Artifact | Raw Size | Gzipped | Budget Limit | Status |');
console.log('| :--- | :--- | :--- | :--- | :--- |');

let failed = false;

for (const item of BUDGETS) {
  const fullPath = path.join(rootDir, item.file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing file: ${item.file}`);
    failed = true;
    continue;
  }

  const content = fs.readFileSync(fullPath);
  const rawBytes = content.length;
  const gzipBytes = zlib.gzipSync(content).length;

  const rawKb = (rawBytes / 1024).toFixed(2);
  const gzipKb = (gzipBytes / 1024).toFixed(2);
  const limitKb = (item.maxBytes / 1024).toFixed(0);

  const passed = rawBytes <= item.maxBytes;
  const status = passed ? '✅ PASS' : '❌ EXCEEDED';

  console.log(`| \`${item.file}\` | ${rawKb} KB | ${gzipKb} KB | ${limitKb} KB | ${status} |`);

  if (!passed) {
    failed = true;
  }
}

console.log('');
if (failed) {
  console.error('❌ Bundle size budget check failed!');
  process.exit(1);
} else {
  console.log('✅ All bundle size budgets satisfied!\n');
}
