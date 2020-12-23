# Sopplayer
A VideoJs Custom Skin Collection -  Sopplayer


#Video Js CDN

## Quick Start

Thanks to the awesome folks over at [Fastly][fastly], there's a free, CDN hosted version of Video.js that anyone can use. Add these tags to your document's `<head>`:

```html
<link href="//vjs.zencdn.net/7.8.2/video-js.min.css" rel="stylesheet">
<script src="//vjs.zencdn.net/7.8.2/video.min.js"></script>
```

> For the latest version of video.js and URLs to use, check out the [Getting Started][getting-started] page on our website.

Video.js version 7 (and newer) CDN builds do not send any data to Google Analytics.

In older versions of Video.js (6 and earlier), in the `vjs.zencdn.net` CDN-hosted versions we include a [stripped down Google Analytics pixel](https://github.com/videojs/cdn/blob/master/src/analytics.js) that tracks a random sampling (currently 1%) of players loaded from the CDN. This allows us to see (roughly) what browsers are in use in the wild, along with other useful metrics such as OS and device. If you'd like to disable analytics, you can simply include the following global before including Video.js via the free CDN:

```html
<script>window.HELP_IMPROVE_VIDEOJS = false;</script>
```

Alternatively, you can include Video.js by getting it from [npm](https://videojs.com/getting-started/#install-via-npm), downloading from [GitHub releases](https://github.com/videojs/video.js/releases) or by including it via [unpkg](https://unpkg.com) or another JavaScript CDN like CDNjs. These releases _do not_ include Google Analytics tracking at all.

```html
<!-- unpkg : use the latest version of Video.js -->
<link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
<script src="https://unpkg.com/video.js/dist/video.min.js"></script>

<!-- unpkg : use a specific version of Video.js (change the version numbers as necessary) -->
<link href="https://unpkg.com/video.js@7.8.2/dist/video-js.min.css" rel="stylesheet">
<script src="https://unpkg.com/video.js@7.8.2/dist/video.min.js"></script>

<!-- cdnjs : use a specific version of Video.js (change the version numbers as necessary) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.8.1/video-js.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.8.1/video.min.js"></script>
```

Next, using Video.js is as simple as creating a `<video>` element, but with an additional `data-setup` attribute. At a minimum, this attribute must have a value of `'{}'`, but it can include any Video.js [options][options] - just make sure it contains valid JSON!

```html
<video
    id="my-player"
    class="video-js"
    controls
    preload="auto"
    poster="//vjs.zencdn.net/v/oceans.png"
    data-setup='{}'>
  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a
    web browser that
    <a href="https://videojs.com/html5-video-support/" target="_blank">
      supports HTML5 video
    </a>
  </p>
</video>
```

When the page loads, Video.js will find this element and automatically setup a player in its place.

If you don't want to use automatic setup, you can leave off the `data-setup` attribute and initialize a `<video>` element manually using the `videojs` function:

```js
var player = videojs('my-player');
```

The `videojs` function also accepts an `options` object and a callback to be invoked
 when the player is ready:

```js
var options = {};

var player = videojs('my-player', options, function onPlayerReady() {
  videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on('ended', function() {
    videojs.log('Awww...over so soon?!');
  });
});
```

If you're ready to dive in, the [Getting Started][getting-started] page and [documentation][docs] are the best places to go for more information. If you get stuck, head over to our [Slack channel][slack-link]!

#
