/* Shared website enhancement layer: mobile navigation, syntax highlighting, copy buttons. */
(function(){
  const PRISM_JS='https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
  const PRISM_CSS='https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css';

  function initNavigation(){
    const button=document.querySelector('.site-menu'),nav=document.querySelector('.site-links');
    if(!button||!nav)return;
    button.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      button.setAttribute('aria-expanded',String(open));
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');
      button.setAttribute('aria-expanded','false');
    }));
  }

  function initCopy(){
    document.querySelectorAll('[data-copy-target]').forEach(button=>{
      button.addEventListener('click',async()=>{
        const target=document.getElementById(button.dataset.copyTarget);
        if(!target||!navigator.clipboard)return;
        const original=button.textContent;
        try{
          await navigator.clipboard.writeText(target.textContent);
          button.textContent='Copied!';
          button.classList.add('copied');
          setTimeout(()=>{button.textContent=original||'Copy';button.classList.remove('copied')},1500);
        }catch{
          button.textContent='Select code';
          setTimeout(()=>{button.textContent=original||'Copy'},1500);
        }
      });
    });
  }

  function initPrism(){
    const blocks=document.querySelectorAll('pre code');
    if(!blocks.length)return;
    blocks.forEach(code=>{
      if(code.className.includes('language-'))return;
      const value=code.textContent.trim();
      let language='bash';
      if(value.includes('<')&&value.includes('>')) language='markup';
      else if(/(^|\n)\s*(import|export|const|let|function|new |player\.)/.test(value)) language='javascript';
      else if(/(^|\n)\s*(\.sp-|--sp-|:root|[.#][\w-]+\s*\{)/.test(value)) language='css';
      code.classList.add('language-'+language);
    });
    if(!document.querySelector('[data-prism]')){
      const link=document.createElement('link');
      link.rel='stylesheet'; link.href=PRISM_CSS; link.dataset.prism='true';
      document.head.appendChild(link);
    }
    if(window.Prism){window.Prism.highlightAll();return;}
    const script=document.createElement('script');
    script.src=PRISM_JS; script.defer=true;
    script.onload=()=>window.Prism&&window.Prism.highlightAll();
    document.head.appendChild(script);
  }

  function init(){initNavigation();initCopy();initPrism();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();