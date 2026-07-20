/* =============================================================
   BIOS TECH — globální JS pro Shoptet
   Běží na KAŽDÉ stránce (na rozdíl od homepage.js).
   Zatím: výměna loga v hlavičce za skutečné BiosTech logo.
   ============================================================= */
(function () {
  'use strict';

  var LOGO_URL = 'https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/biostech-logo.png';

  function replaceLogo() {
    var siteName = document.querySelector('#header .site-name');
    if (!siteName) return;
    var link = siteName.querySelector('a');
    if (!link || link.dataset.btLogoDone) return;

    link.dataset.btLogoDone = 'true';
    link.innerHTML = '<img src="' + LOGO_URL + '" alt="BiosTech" class="bt-logo-img">';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceLogo);
  } else {
    replaceLogo();
  }
})();
