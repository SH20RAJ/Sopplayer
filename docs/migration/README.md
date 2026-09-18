# Migration Guide: v1.x to v2.x

Sopplayer v2.0 represents a complete modernization of the player engine while maintaining **100% backwards compatibility** for existing CDN consumers and HTML integrations.

---

## What Changed in v2.0?

1. **Zero Runtime Dependencies**: Replaced the 815 KB Video.js bundle with a modern, modular <40 KB native engine.
2. **Modern API**: Introduced the clean `new Sopplayer(target, options)` class.
3. **Accessibility**: First-class keyboard navigation, ARIA slider semantics, visible focus rings, and screen-reader auditory announcements.
4. **Security**: Fully audited and patched against DOM XSS and unsafe protocol injection.

---

## Migrating from v1.x

### 1. HTML Markup
In v1.x, you used:
```html
<video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
  <source src="video.mp4" type="video/mp4" />
</video>
```
**In v2.0, this exact markup continues to work automatically!** No changes required.

If you wish to adopt the modern v2 markup:
```html
<video id="my-video" poster="poster.jpg" preload="metadata">
  <source src="video.mp4" type="video/mp4" />
</video>
```

### 2. CDN Script Links
Update from unversioned URLs to **immutable versioned URLs** for production reliability:

- **Legacy**:
  ```html
  <link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js"></script>
  ```
- **Recommended v2.0.0**:
  ```html
  <link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@v2.0.0/dist/sopplayer.min.js"></script>
  ```

### 3. JavaScript Initialization
- **Legacy Video.js style (Still Supported via Compat Layer)**:
  ```javascript
  videojs('my-video').ready(function() {
    this.play();
  });
  ```
- **Modern v2 API**:
  ```javascript
  const player = new Sopplayer('#my-video', {
    theme: 'default'
  });
  player.play();
  ```
