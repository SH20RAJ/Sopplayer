/**
 * Sopplayer v2.0 - Build Pipeline
 * Fast, deterministic bundling with esbuild and clean-css
 */

import esbuild from 'esbuild';
import CleanCSS from 'clean-css';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function build() {
  console.log('🚀 Starting Sopplayer v2.0 build...');

  const distDir = path.join(rootDir, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 1. Bundle JavaScript: ESM
  console.log('📦 Bundling ESM...');
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/index.js')],
    outfile: path.join(distDir, 'sopplayer.esm.js'),
    format: 'esm',
    bundle: true,
    sourcemap: true,
    target: ['es2020']
  });

  // 2. Bundle JavaScript: IIFE / Browser Global (UMD compatibility)
  console.log('📦 Bundling UMD unminified...');
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/index.js')],
    outfile: path.join(distDir, 'sopplayer.js'),
    format: 'iife',
    globalName: 'SopplayerBundle',
    bundle: true,
    sourcemap: true,
    target: ['es2018']
  });

  // 3. Bundle JavaScript: IIFE Minified
  console.log('📦 Bundling UMD minified...');
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/index.js')],
    outfile: path.join(distDir, 'sopplayer.min.js'),
    format: 'iife',
    globalName: 'SopplayerBundle',
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['es2018']
  });

  // 4. Bundle CSS
  console.log('🎨 Processing CSS...');
  const cssEntry = path.join(rootDir, 'src/styles/index.css');
  const cleanCSSInstance = new CleanCSS({
    inline: ['all'],
    rebase: false,
    format: 'beautify'
  });

  const rawCss = fs.readFileSync(cssEntry, 'utf8');
  const bundledCssResult = cleanCSSInstance.minify({
    [cssEntry]: { styles: rawCss }
  });

  if (bundledCssResult.errors.length > 0) {
    console.error('CSS Bundling errors:', bundledCssResult.errors);
  }

  const outputCss = bundledCssResult.styles;
  fs.writeFileSync(path.join(distDir, 'sopplayer.css'), outputCss, 'utf8');

  // Minified CSS
  const minifiedCssResult = new CleanCSS({
    level: 2
  }).minify(outputCss);
  fs.writeFileSync(path.join(distDir, 'sopplayer.min.css'), minifiedCssResult.styles, 'utf8');

  // Copy TypeScript definitions
  fs.copyFileSync(path.join(rootDir, 'src/sopplayer.d.ts'), path.join(distDir, 'sopplayer.d.ts'));

  // 5. Update Root Backwards Compatibility Assets
  console.log('🔄 Syncing legacy root files for historical CDN paths...');
  fs.copyFileSync(path.join(distDir, 'sopplayer.js'), path.join(rootDir, 'sopplayer.js'));
  fs.copyFileSync(path.join(distDir, 'sopplayer.min.js'), path.join(rootDir, 'sopplayer.min.js'));
  fs.copyFileSync(path.join(distDir, 'sopplayer.css'), path.join(rootDir, 'sopplayer.css'));
  fs.copyFileSync(path.join(distDir, 'sopplayer.min.css'), path.join(rootDir, 'sopplayer.min.css'));

  // 6. Generate missing legacy assets referenced in docs
  console.log('🛠️ Generating missing legacy files referenced in historical documentation...');

  // flamingo/sp-flamingo.min.js
  const flamingoJsPath = path.join(rootDir, 'flamingo/sp-flamingo.js');
  if (fs.existsSync(flamingoJsPath)) {
    const minResult = await esbuild.transform(fs.readFileSync(flamingoJsPath, 'utf8'), {
      minify: true,
      target: 'es2015'
    });
    fs.writeFileSync(path.join(rootDir, 'flamingo/sp-flamingo.min.js'), minResult.code, 'utf8');
  }

  // dtube/dtube.min.js & dtube.min.css
  const dtubeJsPath = path.join(rootDir, 'dtube/dtube.js');
  if (fs.existsSync(dtubeJsPath)) {
    const minResult = await esbuild.transform(fs.readFileSync(dtubeJsPath, 'utf8'), {
      minify: true,
      target: 'es2015'
    });
    fs.writeFileSync(path.join(rootDir, 'dtube/dtube.min.js'), minResult.code, 'utf8');
  }

  const dtubeCssPath = path.join(rootDir, 'dtube/dtube.css');
  if (fs.existsSync(dtubeCssPath)) {
    const dtubeMinCss = new CleanCSS().minify(fs.readFileSync(dtubeCssPath, 'utf8')).styles;
    fs.writeFileSync(path.join(rootDir, 'dtube/dtube.min.css'), dtubeMinCss, 'utf8');
  }

  // Default/videojs.css (Missing file fix for Default/index.html)
  const defaultDir = path.join(rootDir, 'Default');
  if (fs.existsSync(defaultDir)) {
    fs.copyFileSync(path.join(distDir, 'sopplayer.min.css'), path.join(defaultDir, 'videojs.css'));
  }

  console.log('✅ Build completed successfully!');
}

build().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
