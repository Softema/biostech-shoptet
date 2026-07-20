/* =============================================================
/* =============================================================
   BIOS TECH — globální JS pro Shoptet
   Běží na KAŽDÉ stránce (na rozdíl od homepage.js).
   Zatím: výměna loga v hlavičce za BiosTech wordmark.
   ============================================================= */
(function () {
  'use strict';

  function replaceLogo() {
    var siteName = document.querySelector('#header .site-name');
    if (!siteName) return;
    var link = siteName.querySelector('a');
    if (!link || link.dataset.btLogoDone) return;

    link.dataset.btLogoDone = 'true';
    link.innerHTML =
      '<span class="bt-logo">' +
        '<span class="bt-logo__mark"></span>' +
        '<span class="bt-logo__text">Bios<span class="bt-logo__accent">Tech</span></span>' +
      '</span>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceLogo);
  } else {
    replaceLogo();
  }
})();
