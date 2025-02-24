# [Sopplayer](https://github.com/SH20RAJ/Sopplayer/) Integration - HTML5 Stylish Video Player

[![](https://data.jsdelivr.com/v1/package/gh/sh20raj/sopplayer/badge)](https://www.jsdelivr.com/package/gh/sh20raj/sopplayer)
[![Visitors](https://api.visitorbadge.io/api/combined?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2Fsopplayer&labelColor=%2337d67a&countColor=%23ba68c8&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2Fsopplayer)

Sopplayer is a sleek and feature-rich HTML5 video player that enhances the visual experience of videos on web pages. It offers compatibility across devices and browsers, supporting various video formats. With intuitive controls and customizable options, Sopplayer provides a seamless and captivating playback experience for viewers.



> See All SopProducts: [https://sh20raj.github.io/SopProducts/](https://sh20raj.github.io/SopProducts/)

> Sopplayer Players: [https://sh20raj.github.io/Sopplayer/players/](https://sh20raj.github.io/Sopplayer/players/)

![Sopplayer Screenshot](https://1.bp.blogspot.com/-MXdsGGbh59A/X-cM2B2eQ6I/AAAAAAAAAZU/KLEP-6BI85gMXR-7NjBWIdxnCKyIaNzbACLcBGAsYHQ/w640-h361/sopplayer.JPG)

**See Video Documentation**: [https://youtu.be/Tmj2QOXE6EU](https://youtu.be/Tmj2QOXE6EU)

**Player Demo**: https://codepen.io/SH20RAJ/pen/QwLRpyx



## Table of Contents
- [Steps](#steps)
- [Before Sopplayer](#before-sopplayer)
- [After Sopplayer](#after-sopplayer)
- [Full HTML Code Example](#full-html-code-example)
- [Additional Information](#additional-information)
- [Demo](./home.html)

## Steps

1. Use the `class="sopplayer"` in your `<video>` tag.
2. Add `data-setup="{}"` attribute to your `<video>` tag.

```html
<video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
  <!-- Use class="sopplayer" and data-setup="{}" -->
  <source src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer@main/sample.mp4" type="video/mp4" />
</video>
```

3. Add the CSS CDN before the closing `</head>` tag.

```html
<link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
<!-- Here is the CSS Library -->
```

4. Add the JavaScript CDN before the closing `</body>` tag.

```html
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js"></script>
<!-- Here is the JavaScript Library -->
```

Here you have completed your Sopplayer Integration.

## Before Sopplayer

![Before Sopplayer](https://1.bp.blogspot.com/-pPXCh0HvCP4/X-cPV_H9i5I/AAAAAAAAAZg/dW7vPwvafR44FdtYowtEaT66Vz8ZfaPnACLcBGAsYHQ/w400-h228/before.JPG)

## After Sopplayer

![After Sopplayer](https://1.bp.blogspot.com/-5VKxy1NHI4s/X-cPXCnksqI/AAAAAAAAAZk/xh-pu7yVskklt1a5FB6yzEPUU_sOXDrfACPcBGAYYCw/w400-h225/after.JPG)

## Full HTML Code Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
  <!-- Here is the CSS Library -->
</head>
<body>
  <center>
    <video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
      <!-- Use class="sopplayer" and data-setup="{}" -->
      <source src="sample.mp4" type="video/mp4" />
    </video>
  </center>
  <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js"></script>
  <!-- Here is the JavaScript Library -->
</body>
</html>
```

## Additional Information

See how the full HTML will look like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
  <!-- Here is the CSS Library -->
</head>
<body>
  <center>
    <video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
      <!-- Use class="sopplayer" and data-setup="{}" -->
      <source src="sample.mp4" type="video/mp4" />
    </video>
  </center>
  <script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.js"></script>
  <!-- Here is the JavaScript Library -->
</body>
</html>
```


Try AudiPlay :- [AudiPlay - A Free HTML5 Audio Player](https://github.com/SH20RAJ/AudiPlay)

<p align="center">
 <a href="https://www.producthunt.com/posts/sopplayer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sopplayer" target="_blank">

<img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=467939&theme=light" alt="Sopplayer - HTML5&#0032;Stylish&#0032;Video&#0032;Player&#0032;&#0124;&#0032;Sopplayer | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
 
</p>
