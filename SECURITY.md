# Security Policy

The Sopplayer project takes the security of our library and downstream web applications seriously. We welcome responsible disclosure from security researchers and developers.

---

## Supported Versions

| Version | Status | Security Support |
| :--- | :--- | :--- |
| **2.0.x** | Current / Recommended | Full security and feature patches |
| **1.x** | Legacy / Backwards-compatible | Critical security vulnerability patches only |
| **< 1.0** | End of Life | Not supported |

---

## Reporting a Vulnerability

If you discover a potential security vulnerability in Sopplayer, please **do not open a public GitHub issue**. Instead, please report it privately:

1. **GitHub Security Advisories**: Submit an advisory privately through the [Sopplayer Security Advisories](https://github.com/SH20RAJ/Sopplayer/security/advisories/new) page.
2. **Direct Email**: Alternatively, email the maintainer directly at `sh20raj@gmail.com` with the subject line: `[Security] Vulnerability in Sopplayer`.

Please include in your report:
- A description of the vulnerability and potential attack scenarios.
- Step-by-step reproduction instructions or a minimal Proof of Concept (PoC).
- Affected versions and environments (browsers, Node version if applicable).

### Our Response Timeline
- **Initial Acknowledgment**: Within **48 hours**.
- **Assessment and Fix Plan**: Within **7 days**.
- **Public Disclosure and Patch Release**: Coordinated with the reporter after testing.

---

## Security Architecture & Best Practices

Sopplayer v2.0 implements strict security defaults:
- **No Unsafe DOM Construction**: We eliminate raw `innerHTML` concatenation with user-provided parameters, relying instead on `textContent` and safe DOM node creation.
- **Strict Protocol Validation**: Media URLs, poster images, and external links are validated to prohibit pseudo-protocols such as `javascript:`, `vbscript:`, and `data:text/html`.
- **Safe Base64 / Query Parsing**: URL parameters (e.g. in embed generators) are parsed within safe `try-catch` blocks and validated against strict schemas before rendering.
- **Zero Third-Party Runtime Tracking**: All legacy third-party tracking scripts (such as AddThis) have been removed.

---

## Recommended Content Security Policy (CSP)

When integrating Sopplayer with a Content Security Policy, the following directives are recommended:

```http
Content-Security-Policy: default-src 'self'; media-src 'self' https: blob:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; script-src 'self' https://cdn.jsdelivr.net;
```
