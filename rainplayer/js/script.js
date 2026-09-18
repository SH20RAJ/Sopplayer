/**
 * Rainplayer - Secure Script Handler
 * Hardened against DOM XSS and parameter injection
 */

function sanitizeMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('data:text/html') ||
    lower.startsWith('data:application/javascript')
  ) {
    console.warn('[Rainplayer Security] Blocked dangerous URL protocol');
    return '';
  }
  return trimmed;
}

function getparam(paramName, targetUrl) {
  try {
    const url = new URL(targetUrl || window.location.href);
    return url.searchParams.get(paramName);
  } catch (e) {
    return null;
  }
}

const s = (id) => document.getElementById(id);

function playit() {
  const playParam = getparam('play');
  if (!playParam) return;

  try {
    const decodedStr = atob(playParam);
    const data = JSON.parse(decodedStr);

    if (data && typeof data === 'object') {
      const safeVidUrl = sanitizeMediaUrl(data.vidurl);
      const safePoster = sanitizeMediaUrl(data.vidposter);

      if (safeVidUrl && s('video')) {
        s('video').src = safeVidUrl;
      }
      if (safePoster && s('video')) {
        s('video').poster = safePoster;
      }
      if (s('title')) {
        s('title').textContent = data.vidtitle || 'Video';
      }
      // SAFE textContent instead of vulnerable innerHTML
      if (s('description')) {
        s('description').textContent = data.viddesc || '';
      }
    }
  } catch (err) {
    console.error('[Rainplayer] Failed to parse play parameter:', err);
    if (s('description')) {
      s('description').textContent = 'Unable to load video configuration from URL.';
    }
  }
}

if (getparam('play')) {
  if (s('tool')) s('tool').style.display = 'none';
  if (s('wrapper')) s('wrapper').style.display = 'block';
  playit();
} else {
  if (s('wrapper')) s('wrapper').style.display = 'none';
  if (s('tool')) s('tool').style.display = 'block';
}

function getbase() {
  const ply = {
    vidurl: sanitizeMediaUrl(s('vidurl') ? s('vidurl').value : ''),
    vidtitle: s('vidtitle') ? s('vidtitle').value : '',
    viddesc: s('viddesc') ? s('viddesc').value : '',
    vidposter: sanitizeMediaUrl(s('vidposter') ? s('vidposter').value : '')
  };
  return btoa(JSON.stringify(ply));
}

function preview() {
  const ply = getbase();
  const link = `${location.pathname}?play=${encodeURIComponent(ply)}`;
  const previewContainer = s('preview');
  if (previewContainer) {
    previewContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.border = '0';
    iframe.title = 'Rainplayer Preview';
    previewContainer.appendChild(iframe);
  }
}

function embed() {
  const ply = getbase();
  const link = `${location.origin}${location.pathname}?play=${encodeURIComponent(ply)}`;
  const title = (s('vidtitle') && s('vidtitle').value) ? s('vidtitle').value.replace(/"/g, '&quot;') : 'Video';
  const codeEl = s('code');
  if (codeEl) {
    codeEl.value = `<iframe src="${link}" width="853" height="480" title="SopPlayer video player - ${title}" frameborder="0" scrolling="no" style="overflow: hidden" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
}

window.preview = preview;
window.embed = embed;
