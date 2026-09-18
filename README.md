<div align="center">

# 🎬 Sopplayer

**The Modern, Accessible & Lightweight HTML5 Video Player**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?style=flat-square)](https://github.com/SH20RAJ/Sopplayer/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](./LICENSE)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-%3C40%20KB-success.svg?style=flat-square)](https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.js)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-purple.svg?style=flat-square)](https://sh20raj.github.io/Sopplayer/demo/accessibility/)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/SH20RAJ/Sopplayer/badge)](https://www.jsdelivr.com/package/gh/SH20RAJ/Sopplayer)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)](https://github.com/SH20RAJ/Sopplayer/actions)

[**Live Demo**](https://sh20raj.github.io/Sopplayer/) &bull;
[**Interactive Playground**](https://sh20raj.github.io/Sopplayer/demo/) &bull;
[**Theme Gallery**](https://sh20raj.github.io/Sopplayer/players/) &bull;
[**A11y Showcase**](https://sh20raj.github.io/Sopplayer/demo/accessibility/) &bull;
[**Documentation**](./docs/)

<br>

<p align="center">
  <img src="og.png" alt="Sopplayer Banner" width="760" style="border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
</p>

</div>

---

## ⚡ Highlights

- 🪶 **Zero Runtime Dependencies**: Written in clean, pure JavaScript. Bundle size is **under 40 KB** minified (over 95% smaller than v1).
- ♿ **First-Class Accessibility (WCAG 2.1 AA)**: Built-in ARIA slider semantics, screen reader auditory announcements (`aria-live="polite"`), high-contrast visible focus rings, and `prefers-reduced-motion` compliance.
- ⌨️ **Comprehensive Keyboard Navigation**: Control playback (<kbd>Space</kbd>/<kbd>K</kbd>), seeking (<kbd>&larr;</kbd>/<kbd>&rarr;</kbd>, <kbd>J</kbd>/<kbd>L</kbd>, <kbd>0</kbd>&ndash;<kbd>9</kbd>), volume (<kbd>&uarr;</kbd>/<kbd>&darr;</kbd>, <kbd>M</kbd>), fullscreen (<kbd>F</kbd>), PiP (<kbd>P</kbd>), and captions (<kbd>C</kbd>).
- 🎨 **Modern Design System & 7 Themes**: Built with CSS Custom Properties. Includes `Default` (Obsidian Glass), `Flamingo` (Coral / Rose), `Forest` (Emerald), `City` (Urban Ruby), `Sea` (Azure), `Fantasy` (Neon Cyberpunk), and `Minimal` (Monochrome).
- 🔒 **Secure by Default**: Completely eliminates raw `innerHTML` construction with untrusted user input, validates media URLs against `javascript:` injection, and handles malformed parameters gracefully.
- 🔄 **100% Backwards Compatible**: Existing CDN URLs (`cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/...`), legacy `<video class="sopplayer" data-setup="...">` tags, and Video.js API wrappers continue working seamlessly.

---

## 🚀 Quickstart

### 1. Versioned CDN (Recommended for Production)

Use immutable, versioned URLs (`@v2.0.0`) to guarantee stability in production:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sopplayer Demo</title>

  <!-- Sopplayer Modern CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.css">
</head>
<body>

  <video id="my-video" poster="poster.jpg" preload="metadata" width="720">
    <source src="sample.mp4" type="video/mp4" />
    <track kind="subtitles" label="English" srclang="en" src="subtitles-en.vtt" default>
    <p>Your browser does not support HTML5 video.</p>
  </video>

  <!-- Sopplayer Modern JavaScript -->
  <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.js"></script>
  <script>
    const player = new Sopplayer('#my-video', {
      theme: 'default',
      aspectRatio: '16:9'
    });
  </script>

</body>
</html>
```

### 2. NPM / Modern Bundlers

```bash
npm install sopplayer
```

```javascript
import { Sopplayer } from 'sopplayer';
import 'sopplayer/css';

const player = new Sopplayer('#my-video', {
  theme: 'flamingo',
  autoplay: false
});
```

### 3. React / Next.js Integration

```jsx
import { useEffect, useRef } from 'react';
import { Sopplayer } from 'sopplayer';
import 'sopplayer/css';

export function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Sopplayer(videoRef.current, {
        theme: 'default'
      });
    }
    return () => {
      if (playerRef.current) playerRef.current.destroy();
    };
  }, []);

  return <video ref={videoRef} src={src} poster={poster} />;
}
```

---

## 🎨 Themes & Design System

Sopplayer ships with 7 production-grade themes out of the box. You can test them interactively in the [Theme Gallery](https://sh20raj.github.io/Sopplayer/players/).

```javascript
// Initialize with any theme:
const player = new Sopplayer('#my-video', { theme: 'flamingo' });

// Or switch themes dynamically at runtime:
player.setTheme('forest');
```

### Customizing CSS Tokens
You can override any design token in your application stylesheet:

```css
.sp-player.sp-theme-custom {
  --sp-color-primary: #8b5cf6;            /* Violet accent */
  --sp-color-primary-glow: rgba(139, 92, 246, 0.4);
  --sp-color-bg: rgba(15, 10, 30, 0.9);   /* Deep glass backdrop */
  --sp-radius-md: 16px;                   /* Corner roundness */
}
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| <kbd>Space</kbd> or <kbd>K</kbd> | **Play / Pause** | Toggle video playback |
| <kbd>&larr;</kbd> / <kbd>&rarr;</kbd> | **Seek &plusmn;5s** | Hold <kbd>Shift</kbd> for &plusmn;10s |
| <kbd>J</kbd> / <kbd>L</kbd> | **Seek &plusmn;10s** | Quick seek backward / forward |
| <kbd>&uarr;</kbd> / <kbd>&darr;</kbd> | **Volume &plusmn;10%** | Adjust audio volume level |
| <kbd>M</kbd> | **Mute / Unmute** | Toggle audio mute |
| <kbd>F</kbd> | **Fullscreen** | Toggle browser fullscreen |
| <kbd>P</kbd> | **Picture-in-Picture** | Toggle floating PiP window |
| <kbd>C</kbd> | **Captions** | Toggle subtitles / captions |
| <kbd>0</kbd> &ndash; <kbd>9</kbd> | **Seek to %** | Jump to 0% through 90% of duration |
| <kbd>?</kbd> | **Help Dialog** | Open keyboard shortcuts modal |
| <kbd>Esc</kbd> | **Close** | Close open popup menus or modal |

---

## 📖 API Reference Summary

### Options
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `string` | `'default'` | Theme name (`'default'`, `'flamingo'`, `'forest'`, `'city'`, `'sea'`, `'fantasy'`, `'minimal'`). |
| `aspectRatio` | `string` | `'16:9'` | Responsive aspect ratio (`'16:9'`, `'4:3'`, `'1:1'`, `'21:9'`, `'fill'`). |
| `autoplay` | `boolean` | `false` | Attempt automatic playback on mount. |
| `muted` | `boolean` | `false` | Initial audio mute state. |
| `volume` | `number` | `1.0` | Initial audio volume (0.0 to 1.0). |
| `playbackRate` | `number` | `1.0` | Initial playback speed rate. |
| `shortcuts` | `boolean` | `true` | Enable accessible keyboard controls. |
| `hideControlsDelay`| `number` | `3000` | Mouse inactivity timeout before controls fade out. |

### Methods
- `player.play(): Promise<void>` &bull; `player.pause(): void` &bull; `player.togglePlay(): void`
- `player.seek(seconds): void` &bull; `player.forward(seconds): void` &bull; `player.rewind(seconds): void`
- `player.setVolume(val): void` &bull; `player.setMuted(bool): void` &bull; `player.toggleMute(): void`
- `player.setSpeed(rate): void` &bull; `player.setTrack(index): void` &bull; `player.setTheme(name): void`
- `player.toggleFullscreen(): Promise<boolean>` &bull; `player.togglePip(): Promise<boolean>`
- `player.destroy(): void`

### Events
- `player.on(event, handler)` &bull; `player.once(event, handler)` &bull; `player.off(event, handler)`
- Supported events: `ready`, `play`, `pause`, `ended`, `timeupdate`, `volumechange`, `ratechange`, `waiting`, `playing`, `canplay`, `error`, `fullscreenchange`, `pipchange`, `themechange`.

Full documentation is available in the [API Documentation](./docs/api/).

---

## 🔄 Backwards Compatibility Guarantee

Existing applications and CDN consumers are guaranteed **zero breaking changes**:

1. **Historical CDN URLs continue to resolve**:
   - `https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js`
   - `https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css`
2. **Legacy HTML Tags Auto-Initialize**:
   ```html
   <video class="sopplayer" data-setup="{}" controls>
     <source src="sample.mp4" type="video/mp4" />
   </video>
   ```
3. **Video.js Compatibility Proxy**: Code calling `window.videojs('my-video')` continues to operate via our built-in `v1Adapter.js` compatibility layer.

---

## 🌐 Browser Support

| Browser | Support Level |
| :--- | :--- |
| **Google Chrome / Chromium** | Latest 2 versions &bull; Full Features |
| **Mozilla Firefox** | Latest 2 versions &bull; Full Features |
| **Apple Safari (macOS &amp; iOS)** | Latest 2 versions &bull; Full Features (Webkit PiP &amp; Fullscreen) |
| **Microsoft Edge** | Latest 2 versions &bull; Full Features |
| **Mobile Browsers (Android &amp; iOS)** | Touch-optimized scrubber, mobile overlays |

---

## 🛠️ Development & Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for local development setup and guidelines.

```bash
# Clone the repository
git clone https://github.com/SH20RAJ/Sopplayer.git
cd Sopplayer

# Install dependencies
npm install

# Start local preview server
npm run dev

# Run automated tests
npm test

# Build production distribution
npm run build
```

---

## 🛡️ Security

To report security vulnerabilities, please refer to our [Security Policy](./SECURITY.md).

---

## 📄 License

Sopplayer is open-source software licensed under the [MIT License](./LICENSE).

&copy; 2020&ndash;2026 [SH20RAJ](https://github.com/SH20RAJ). All rights reserved.
