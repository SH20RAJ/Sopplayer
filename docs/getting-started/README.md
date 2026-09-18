# Getting Started with Sopplayer

Sopplayer is a modern, accessible, and lightweight HTML5 video player with zero runtime dependencies.

---

## 1. Quick Installation via CDN (Recommended)

For production stability, we **strongly recommend using immutable, versioned URLs** (`@v2.0.0`) so downstream changes never unexpectedly break your application.

### Recommended (Versioned v2.0.0)
```html
<head>
  <!-- Sopplayer Modern v2.0.0 CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.css">
</head>
<body>
  <video id="player" poster="poster.jpg" preload="metadata">
    <source src="video.mp4" type="video/mp4">
  </video>

  <!-- Sopplayer Modern v2.0.0 JavaScript -->
  <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.js"></script>
  <script>
    const player = new Sopplayer('#player', {
      theme: 'default'
    });
  </script>
</body>
```

### Legacy CDN Endpoints (Backwards Compatible)
Historical endpoints without version tags continue to work for existing installations:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css">
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js"></script>
```

---

## 2. Installation via NPM

```bash
npm install sopplayer
```

### ES Module Usage:
```javascript
import { Sopplayer } from 'sopplayer';
import 'sopplayer/css';

const player = new Sopplayer('#player', {
  theme: 'flamingo',
  aspectRatio: '16:9'
});
```

---

## 3. Auto-Initialization via HTML Attributes

If you have multiple videos on a page, you can auto-initialize them using either modern `data-sop-player` or legacy `class="sopplayer"`:

```html
<video class="sopplayer" data-setup='{"theme": "forest"}' poster="poster.jpg">
  <source src="video.mp4" type="video/mp4">
</video>
```
Sopplayer will automatically detect and initialize all matched videos on `DOMContentLoaded`.
