/* Shared website enhancement layer: mobile navigation, code highlighting, copy buttons. */
(function () {
  const PRISM_JS = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
  const PRISM_CSS = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css';
  const PRISM_BASH = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js';

  function initNavigation() {
    const button = document.querySelector('.site-menu');
    const nav = document.querySelector('.site-links');
    if (!button || !nav) return;

    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initCopy() {
    document.querySelectorAll('[data-copy-target]').forEach((button) => {
      button.addEventListener('click', async () => {
        const target = document.getElementById(button.dataset.copyTarget);
        if (!target || !navigator.clipboard) return;

        const original = button.textContent;

        try {
          await navigator.clipboard.writeText(target.textContent);
          button.textContent = 'Copied!';
          button.classList.add('copied');

          setTimeout(() => {
            button.textContent = original || 'Copy';
            button.classList.remove('copied');
          }, 1500);
        } catch {
          button.textContent = 'Select code';
          setTimeout(() => {
            button.textContent = original || 'Copy';
          }, 1500);
        }
      });
    });
  }

  function loadBash() {
    const needsBash = document.querySelector('code.language-bash');
    if (!needsBash || !window.Prism) {
      if (window.Prism) window.Prism.highlightAll();
      return;
    }

    if (window.Prism.languages.bash) {
      window.Prism.highlightAll();
      return;
    }

    const script = document.createElement('script');
    script.src = PRISM_BASH;
    script.defer = true;
    script.onload = () => window.Prism && window.Prism.highlightAll();
    document.head.appendChild(script);
  }

  function initPrism() {
    const blocks = document.querySelectorAll('pre code');
    if (!blocks.length) return;

    blocks.forEach((code) => {
      if (code.className.includes('language-')) return;

      const value = code.textContent.trim();
      let language = 'text';

      if (value.includes('<') && value.includes('>')) {
        language = 'markup';
      } else if (/^\s*(import|export|const|let|function|new |player\.)/m.test(value)) {
        language = 'javascript';
      } else if (/^\s*(\.sp-|--sp-|:root|[.#][\w-]+\s*\{)/m.test(value)) {
        language = 'css';
      } else if (/^\s*(npm|pnpm|yarn|npx)\s+/m.test(value)) {
        language = 'bash';
      }

      code.classList.add('language-' + language);
    });

    if (!document.querySelector('[data-prism]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = PRISM_CSS;
      link.dataset.prism = 'true';
      document.head.appendChild(link);
    }

    if (window.Prism) {
      loadBash();
      return;
    }

    const script = document.createElement('script');
    script.src = PRISM_JS;
    script.defer = true;
    script.onload = loadBash;
    document.head.appendChild(script);
  }

  function init() {
    initNavigation();
    initCopy();
    initPrism();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();