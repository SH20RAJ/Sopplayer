# Plugin Architecture

Sopplayer v2.0 provides an extensible architecture for creating plugins such as analytics loggers, custom buttons, advertisement handlers, and telemetry hooks.

---

## Writing a Plugin

A Sopplayer plugin is simply a function that receives the player instance and optional configuration:

```javascript
function analyticsPlugin(player, options = {}) {
  const endpoint = options.endpoint || '/api/analytics';

  player.on('play', () => {
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ event: 'play', time: player.currentTime })
    });
  });

  player.on('ended', () => {
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ event: 'ended' })
    });
  });
}
```

### Using the Plugin:
```javascript
const player = new Sopplayer('#video');
analyticsPlugin(player, { endpoint: 'https://telemetry.example.com/log' });
```
