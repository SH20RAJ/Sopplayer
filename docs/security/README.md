# Security Architecture & Policies

Security is an essential engineering priority for Sopplayer. This document details our defensive programming practices and input validation safeguards.

---

## Threat Model & Protections

### 1. Cross-Site Scripting (XSS) via Media URLs
- **Threat**: Attackers providing `javascript:...` or `data:text/html` URLs into `src`, `poster`, or embed URL query parameters.
- **Protection**: All URLs passed to `setSource()`, `setPoster()`, or decoded from URL queries are checked by `sanitizeUrl()`. Any URL starting with `javascript:`, `vbscript:`, `data:text/html`, or `data:application/javascript` is discarded.

### 2. DOM XSS via InnerHTML
- **Threat**: Passing untrusted user strings into `innerHTML` or `insertAdjacentHTML`.
- **Protection**: Sopplayer exclusively uses `textContent` and `createElement` for dynamic data (titles, descriptions, timestamps, error text). `innerHTML` is strictly forbidden except for trusted static inline SVG definitions.

### 3. Base64 & Query Parameter Injection
- **Threat**: Malformed Base64 parameters in shareable player URLs causing unhandled exceptions or code execution.
- **Protection**: Input is parsed inside protected `try-catch` blocks and validated against strict object schemas before any state changes occur.

---

## Content Security Policy (CSP) Directives

```http
Content-Security-Policy: default-src 'self'; media-src 'self' https: blob:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; script-src 'self' https://cdn.jsdelivr.net;
```
