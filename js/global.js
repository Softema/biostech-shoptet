/* =============================================================
   BIOS TECH — globální JS pro Shoptet
   Běží na KAŽDÉ stránce (na rozdíl od homepage.js).
   1) výměna loga v hlavičce za skutečné BiosTech logo
   2) výměna nativní patičky Shoptetu za patičku z návrhu
   ============================================================= */
(function () {
  'use strict';

  var LOGO_URL = 'https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/biostech-logo.png';
  var FOOTER_MARKUP = "<footer class=\"site-footer\"><div class=\"container\"><div class=\"footer-grid\"><div class=\"footer-intro\"><span style=\"display: inline-block; background: rgb(255, 255, 255); padding: 10px 16px; border-radius: 10px;\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-10fbf344.png\" alt=\"BiosTech\" style=\"height: 38px; width: auto; display: block; object-fit: contain;\"></span><p>Showroom techniky pro vaši práci. Vyberte. Porovnejte. Vyzkoušejte.</p><div class=\"footer-newsletter\"><input type=\"email\" placeholder=\"vas@email.cz\"><button type=\"submit\">Přihlásit</button></div></div><div><h4>Produkty</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Rhinoceros — Hobby</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">M3 — Hobby/Profi</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">ACE Profi</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Minibagry</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Nakladače</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Příslušenství</a></div><div><h4>Showroom</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Štoky — návštěva</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Testovací jízda</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Den traktorů</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Otevírací doba</a></div><div><h4>Služby</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Servis</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Financování</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Doprava</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Reklamace</a></div><div><h4>Kontakt</h4><a href=\"tel:+420603123456\">+420 603 123 456</a><a href=\"mailto:showroom@biostech.cz\">showroom@biostech.cz</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Štoky 184, 582 53</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Po–Pá 8:00–17:00</a></div></div><div class=\"footer-bottom\"><div>© 2026 BiosImport s.r.o. · Bios TECH je značka skupiny Bios. · IČ 17543169</div><div class=\"pay-row\"><span class=\"pay-pill\">VISA</span><span class=\"pay-pill\">MASTERCARD</span><span class=\"pay-pill\">APPLE PAY</span><span class=\"pay-pill\">PŘEVOD</span><span class=\"pay-pill\">SPLÁTKY</span></div></div></div></footer>";

  function replaceLogo() {
    var siteName = document.querySelector('#header .site-name');
    if (!siteName) return;
    var link = siteName.querySelector('a');
    if (!link || link.dataset.btLogoDone) return;

    link.dataset.btLogoDone = 'true';
    link.innerHTML = '<img src="' + LOGO_URL + '" alt="BiosTech" class="bt-logo-img">';
  }


  var BT_FOOTER_LINKS = {
    'Rhinoceros — Hobby': '/rhinoceros-hobby/',
    'M3 — Hobby/Profi': '/m3-hobby-profi/',
    'ACE Profi': '/ace-profi/',
    'Minibagry': '/minibagry/',
    'Nakladače': '/nakladace/',
    'Příslušenství': '/prislusenstvi/',
    'Štoky — návštěva': '/showroom-stoky/',
    'Otevírací doba': '/showroom-stoky/',
    'Testovací jízda': '/testovaci-jizda/',
    'Servis': '/servis/',
    'Financování': '/financovani/'
  };

  function wireFooterLinks(root) {
    root.querySelectorAll('a').forEach(function (a) {
      var text = (a.textContent || '').replace(/\s+/g, ' ').trim();
      if (BT_FOOTER_LINKS[text]) a.setAttribute('href', BT_FOOTER_LINKS[text]);
    });
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
    wireFooterLinks(wrap);
  }


  function upgradeTopBar() {
    var bar = document.querySelector('.top-navigation-bar');
    if (!bar || bar.dataset.btDone) return;
    bar.dataset.btDone = 'true';

    // Kontakty: telefon + e-mail
    var contacts = bar.querySelector('.top-navigation-contacts');
    if (contacts) {
      contacts.innerHTML =
        '<strong>Zákaznická podpora:</strong>' +
        '<a href="tel:+420603123456" class="project-phone"><span>+420 603 123 456</span></a>' +
        '<a href="mailto:showroom@biostech.cz" class="bt-topbar-email">showroom@biostech.cz</a>';
    }

    // Odkazy uprostřed
    var menu = bar.querySelector('.top-navigation-bar-menu');
    if (menu) {
      menu.innerHTML =
        '<li><a href="/showroom-stoky/">Showroom Štoky</a></li>' +
        '<li><a href="/servis/">Servis</a></li>' +
        '<li><a href="/financovani/">Financování</a></li>' +
        '<li><a href="/testovaci-jizda/">Testovací jízda</a></li>';
    }
  }

  function upgradeSearch() {
    var input = document.querySelector('#header input.search-input');
    if (input) input.placeholder = 'Hledejte traktor, minibagr, nakladač…';
  }

  function upgradeNav() {
    var menu = document.querySelector('#navigation .menu-level-1');
    if (!menu) return;
    // (10) schovat Značky
    var brands = menu.querySelector('a[data-testid="brandsText"]');
    if (brands && brands.closest('li')) brands.closest('li').style.display = 'none';
    if (menu.querySelector('.bt-nav-right')) return;
    var li1 = document.createElement('li');
    li1.className = 'bt-nav-right bt-nav-showroom';
    li1.innerHTML = '<a href="/showroom-stoky/"><b><span class="bt-dot"></span>Showroom Štoky</b></a>';
    var li2 = document.createElement('li');
    li2.className = 'bt-nav-extra';
    li2.innerHTML = '<a href="/testovaci-jizda/"><b>Testovací jízda</b></a>';
    menu.appendChild(li1);
    menu.appendChild(li2);
  }


  /* =============================================================
     MENU OVERFLOW FIX — Shoptet presouva polozky, ktere se
     "nevejdou", do dropdownu .menu-helper (checkMenuSize) a
     znovu je tam strka pri kazdem resize. CSS je nevrati,
     protoze uz nejsou primymi detmi .menu-level-1 — musime
     je JS-em prestehovat zpatky a helper vypnout.
     ============================================================= */
  function fixMenuOverflow() {
    var menu = document.querySelector('#navigation .menu-level-1');
    if (!menu) return;
    var helper = menu.querySelector('.menu-helper');
    if (!helper) return;

    var inner = helper.querySelector('ul');
    // polozky vratit zpet do menu, pred nase prave polozky
    var anchor = menu.querySelector('.bt-nav-right') || helper;
    if (inner) {
      while (inner.firstElementChild) {
        menu.insertBefore(inner.firstElementChild, anchor);
      }
    }
    helper.style.display = 'none';
  }

  function watchMenuOverflow() {
    var menu = document.querySelector('#navigation .menu-level-1');
    if (!menu) return;
    fixMenuOverflow();
    // Shoptet helper znovu plni pri kazdem resize -> hlidame a vracime
    new MutationObserver(function () {
      var inner = menu.querySelector('.menu-helper ul');
      if (inner && inner.firstElementChild) fixMenuOverflow();
    }).observe(menu, { childList: true, subtree: true });
    window.addEventListener('resize', function () {
      setTimeout(fixMenuOverflow, 100);
    });
  }

  function init() {
    replaceLogo();
    replaceFooter();
    upgradeTopBar();
    upgradeSearch();
    upgradeNav();
    watchMenuOverflow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
