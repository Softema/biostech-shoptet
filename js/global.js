/* =============================================================
   BIOS TECH — globální JS pro Shoptet
   Běží na KAŽDÉ stránce (na rozdíl od homepage.js).
   1) výměna loga v hlavičce za skutečné BiosTech logo
   2) výměna nativní patičky Shoptetu za patičku z návrhu
   ============================================================= */
(function () {
  'use strict';

  var LOGO_URL = 'https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/biostech-logo.png';
  var FOOTER_MARKUP = "<footer class=\"site-footer\"><div class=\"container\"><div class=\"footer-grid\"><div class=\"footer-intro\"><span style=\"display: inline-block; background: rgb(255, 255, 255); padding: 10px 16px; border-radius: 10px;\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-10fbf344.png\" alt=\"BiosTech\" style=\"height: 38px; width: auto; display: block; object-fit: contain;\"></span><p>Showroom techniky pro vaši práci. Vyberte. Porovnejte. Vyzkoušejte.</p><div class=\"footer-newsletter\"><input type=\"email\" placeholder=\"vas@email.cz\"><button type=\"submit\">Přihlásit</button></div></div><div><h4>Produkty</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Rhinoceros — Hobby</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">M3 — Hobby/Profi</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">ACE Profi</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Minibagry</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Nakladače</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Příslušenství</a></div><div><h4>Showroom</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Štoky — návštěva</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Testovací jízda</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Den traktorů</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Otevírací doba</a></div><div><h4>Služby</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Servis</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Financování</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Doprava</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Reklamace</a></div><div><h4>Kontakt</h4><a href=\"tel:+420603123456\">+420 603 123 456</a><a href=\"mailto:showroom@biostech.cz\">showroom@biostech.cz</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Štoky 184, 582 53</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Po–Pá 8:00–17:00</a></div></div><div class=\"footer-bottom\"><div>© 2026 BiosImport s.r.o. · Bios TECH je značka skupiny Bios. · IČ 12345678</div><div class=\"pay-row\"><span class=\"pay-pill\">VISA</span><span class=\"pay-pill\">MASTERCARD</span><span class=\"pay-pill\">APPLE PAY</span><span class=\"pay-pill\">PŘEVOD</span><span class=\"pay-pill\">SPLÁTKY</span></div></div></div></footer>";

  function replaceLogo() {
    var siteName = document.querySelector('#header .site-name');
    if (!siteName) return;
    var link = siteName.querySelector('a');
    if (!link || link.dataset.btLogoDone) return;

    link.dataset.btLogoDone = 'true';
    link.innerHTML = '<img src="' + LOGO_URL + '" alt="BiosTech" class="bt-logo-img">';
  }

  function replaceFooter() {
    if (document.getElementById('bt-footer')) return;
    var nativeFooter = document.getElementById('footer');

    var wrap = document.createElement('div');
    wrap.className = 'bt-scope';
    wrap.id = 'bt-footer';
    wrap.innerHTML = FOOTER_MARKUP;

    if (nativeFooter && nativeFooter.parentNode) {
      nativeFooter.style.display = 'none';
      nativeFooter.parentNode.insertBefore(wrap, nativeFooter);
    } else {
      document.body.appendChild(wrap);
    }
  }

  function init() {
    replaceLogo();
    replaceFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
