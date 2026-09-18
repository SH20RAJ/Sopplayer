# Sopplayer Configuration Options

When instantiating `Sopplayer`, pass an options object as the second argument:

```javascript
const player = new Sopplayer('#my-video', {
  theme: 'flamingo',
  aspectRatio: '16:9',
  autoplay: false,
  volume: 0.8,
  shortcuts: true
});
```

---

## Options Table

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `string` | `'default'` | Skin name (`'default'`, `'flamingo'`, `'forest'`, `'city'`, `'sea'`, `'fantasy'`, `'minimal'`). |
| `aspectRatio` | `string` | `'16:9'` | Container aspect ratio (`'16:9'`, `'4:3'`, `'1:1'`, `'21:9'`, `'fill'`). |
| `autoplay` | `boolean` | `false` | Whether to automatically attempt playback upon initialization. |
| `muted` | `boolean` | `false` | Initial audio mute state. |
| `volume` | `number` | `1.0` | Initial audio volume between `0.0` and `1.0`. |
| `playbackRate` | `number` | `1.0` | Initial playback speed rate. |
| `preload` | `string` | `'metadata'` | Media preloading behavior (`'auto'`, `'metadata'`, `'none'`). |
| `loop` | `boolean` | `false` | Whether the video restarts automatically after ending. |
| `shortcuts` | `boolean` | `true` | Enables accessible keyboard shortcut controls. |
| `hideControlsDelay`| `number` | `3000` | Inactivity delay in milliseconds before hiding controls during playback. |
