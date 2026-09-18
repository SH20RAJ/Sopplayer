# Changelog

All notable changes to the **Sopplayer** project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-09-18

### Complete Architectural Revamp & Modernization

This major release transforms Sopplayer from a monolithic Video.js skin into an independent, accessible, modern HTML5 video player with zero runtime dependencies.

#### Added
- **Modern Core Architecture (`src/`)**:
  - Independent, zero-dependency `Sopplayer` class with lifecycle management.
  - Typed `EventEmitter` supporting `on`, `off`, `once`, and `emit`.
  - Comprehensive TypeScript type definitions (`dist/sopplayer.d.ts`).
  - Native ESM bundle (`dist/sopplayer.esm.js`) and universal IIFE/UMD bundles (`dist/sopplayer.js`, `dist/sopplayer.min.js`).
- **Complete Design System (`tokens.css`, `skins/`)**:
  - Fluid glassmorphic controls with CSS Custom Properties (`--sp-*`).
  - 7 curated, production-grade skins: `default` (Obsidian Glass), `flamingo` (Rose/Coral), `forest` (Emerald Nature), `city` (Urban Ruby/Amber), `sea` (Deep Azure), `fantasy` (Neon Cyberpunk), `minimal` (Monochrome).
  - Responsive container aspect ratios (`16:9`, `4:3`, `1:1`, `21:9`, `fill`).
- **First-Class Accessibility (WCAG 2.1 AA Compliant)**:
  - Accessible keyboard navigation (`Space`/`K` play/pause, Left/Right seeking, Up/Down volume, `M` mute, `F` fullscreen, `P` PiP, `C` captions, `0-9` seek, `?` help dialog).
  - High-contrast visible focus rings (`:focus-visible`).
  - Screen reader announcements via live region (`aria-live="polite"`).
  - Full ARIA semantics for progress and volume sliders (`role="slider"`, `aria-valuenow`, `aria-valuetext`).
  - Full support for `prefers-reduced-motion`.
- **Advanced Player Controls**:
  - Interactive scrubber with hover timestamp preview and buffered progress ranges.
  - Multi-language WebVTT subtitles & captions menu.
  - Playback speed control (0.25x to 2x).
  - Picture-in-Picture (PiP) and Fullscreen API abstractions.
  - Centered glassmorphic big play button with subtle pulse animation.
  - Animated buffering spinner.
  - Error recovery overlay with retry capability.
  - Accessible keyboard shortcuts cheat sheet modal (`?` key).
- **Automated Test Suite & Build System**:
  - Deterministic build pipeline powered by `esbuild` and `clean-css`.
  - Node.js test suite covering unit logic, DOM utilities, and XSS security vectors.
  - Automated GitHub Actions CI workflow for multiple Node versions.
  - Automated GitHub Pages deployment workflow.
- **Demos & Showcase**:
  - Beautiful landing page (`index.html`) fixing GitHub Pages 404.
  - Interactive Playground (`demo/index.html`) with real-time event telemetry and embed code generator.
  - Specialized demos: `demo/basic/`, `demo/themes/`, `demo/accessibility/`, `demo/captions/`, `demo/fullscreen/`, `demo/integrations/`.
  - Players directory (`players/index.html`).

#### Changed
- **Bundle Size Optimization**: Reduced minified bundle size by over 95% (from 815 KB to <40 KB).
- **Hardened Security**:
  - Eliminated unsafe `innerHTML` construction in `rainplayer/js/script.js` and `ckin/ckin.js`.
  - Added strict URL protocol sanitization blocking `javascript:`, `vbscript:`, and `data:text/html`.
  - Protected URL parameter parsing against unhandled exception crashes.
  - Removed deprecated third-party tracking scripts (`s7.addthis.com`).

#### Backwards Compatibility Guarantee
- Maintained 100% backwards compatibility for existing CDN URLs:
  - `cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.js`
  - `cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js`
  - `cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.css`
  - `cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css`
- Legacy `<video class="sopplayer" data-setup="...">` tags automatically initialize.
- Global `window.videojs` and `window.sopplayer` methods preserved via `v1Adapter.js`.

---

## [1.0.0] - 2020-12-25
- Initial public release of Sopplayer.
- Video.js 7.x theme skin with custom play/pause SVGs.
- Added demo pages and player variants (Flamingo, Rainplayer, Afterglow).
