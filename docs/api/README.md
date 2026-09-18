# Sopplayer API Reference

## Constructor

```javascript
const player = new Sopplayer(target, options);
```

### Parameters
- `target`: `string | HTMLVideoElement` &mdash; CSS selector string (e.g. `'#my-video'`) or a direct DOM reference to an `HTMLVideoElement`.
- `options`: `object` (optional) &mdash; Configuration options object.

---

## Methods

### Playback Controls
- `player.play(): Promise<void>` &mdash; Initiates playback. Returns a Promise.
- `player.pause(): void` &mdash; Pauses video playback.
- `player.togglePlay(): void` &mdash; Toggles between play and pause.
- `player.seek(seconds: number): void` &mdash; Seeks to a specific timestamp in seconds.
- `player.forward(seconds = 5): void` &mdash; Seeks forward by the specified number of seconds.
- `player.rewind(seconds = 5): void` &mdash; Seeks backward by the specified number of seconds.

### Audio Controls
- `player.setVolume(volume: number): void` &mdash; Sets volume level between `0.0` (silent) and `1.0` (maximum).
- `player.setMuted(muted: boolean): void` &mdash; Sets mute state.
- `player.toggleMute(): void` &mdash; Toggles audio mute state.

### Display & Advanced Modes
- `player.setSpeed(rate: number): void` &mdash; Sets playback speed multiplier (e.g. `0.5`, `1.0`, `1.5`, `2.0`).
- `player.toggleFullscreen(): Promise<boolean>` &mdash; Toggles browser fullscreen mode.
- `player.togglePip(): Promise<boolean>` &mdash; Toggles Picture-in-Picture mode.
- `player.toggleShortcuts(): void` &mdash; Opens or closes the keyboard shortcuts help dialog.
- `player.setTrack(index: number): void` &mdash; Switches active subtitle track index (`-1` disables subtitles).
- `player.setTheme(themeName: string): void` &mdash; Dynamically applies a skin theme (`'default'`, `'flamingo'`, `'forest'`, `'city'`, `'sea'`, `'fantasy'`, `'minimal'`).
- `player.setSource(src: string, type?: string): void` &mdash; Safely updates the video source.
- `player.setPoster(url: string): void` &mdash; Safely updates the video poster image.
- `player.destroy(): void` &mdash; Removes all event listeners, managers, and restores native video DOM element.

---

## Getters
- `player.currentTime`: `number` &mdash; Current playback position in seconds.
- `player.duration`: `number` &mdash; Total media duration in seconds.
- `player.volume`: `number` &mdash; Current audio volume (0.0 to 1.0).
- `player.muted`: `boolean` &mdash; Current mute status.
- `player.playbackRate`: `number` &mdash; Current playback speed multiplier.
- `player.paused`: `boolean` &mdash; Whether the player is paused.
- `player.ended`: `boolean` &mdash; Whether playback has reached the end.
- `player.textTracks`: `TextTrack[]` &mdash; Array of available subtitle / caption tracks.
- `player.activeTrackIndex`: `number` &mdash; Index of currently displaying subtitle track (-1 if off).

---

## Events

Sopplayer provides a typed EventEmitter API:

```javascript
// Register event listener
const unsubscribe = player.on('play', () => {
  console.log('Video started');
});

// Single-fire listener
player.once('ended', () => {
  console.log('Video completed');
});

// Remove listener
player.off('play', handler);
```

### Supported Events
- `'ready'` &mdash; Player initialization complete.
- `'play'` &mdash; Playback commenced.
- `'pause'` &mdash; Playback paused.
- `'ended'` &mdash; Playback completed.
- `'timeupdate'` &mdash; Current playback time changed (`{ currentTime, duration }`).
- `'volumechange'` &mdash; Volume or mute state changed (`{ volume, muted }`).
- `'ratechange'` &mdash; Playback speed changed.
- `'waiting'` &mdash; Player buffering media data.
- `'playing'` &mdash; Playback resumed after buffering.
- `'canplay'` &mdash; Sufficient data buffered to begin playback.
- `'error'` &mdash; Media playback error occurred.
- `'fullscreenchange'` &mdash; Fullscreen mode toggled (`isFullscreen`).
- `'pipchange'` &mdash; Picture-in-Picture mode toggled (`isPip`).
- `'themechange'` &mdash; Active theme changed (`themeName`).
