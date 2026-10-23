/* =============================================================
   BIOS TECH — globální JS pro Shoptet
   Běží na KAŽDÉ stránce (na rozdíl od homepage.js).
   1) výměna loga v hlavičce za skutečné BiosTech logo
   2) výměna nativní patičky Shoptetu za patičku z návrhu
   ============================================================= */
(function () {
  'use strict';

  var LOGO_URL = 'https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/biostech-logo.png';
  var FOOTER_MARKUP = "<footer class=\"site-footer\"><div class=\"container\"><div class=\"footer-grid\"><div class=\"footer-intro\"><span style=\"display: inline-block; background: rgb(255, 255, 255); padding: 10px 16px; border-radius: 10px;\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-10fbf344.png\" alt=\"BiosTech\" style=\"height: 38px; width: auto; display: block; object-fit: contain;\"></span><p>Showroom techniky pro vaši práci. Vyberte. Porovnejte. Vyzkoušejte.</p><div class=\"footer-newsletter\"><input type=\"email\" placeholder=\"vas@email.cz\"><button type=\"submit\">Přihlásit</button></div></div><div><h4>Produkty</h4><a href=\"/malotraktory/\">Malotraktory</a><a href=\"/minibagry/\">Minibagry</a><a href=\"/nakladace/\">Nakladače</a><a href=\"/prislusenstvi/\">Příslušenství</a><a href=\"/ace-profi/\">ACE traktory</a></div><div><h4>Showroom</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Štoky — návštěva</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Testovací jízda</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Den traktorů</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Otevírací doba</a></div><div><h4>Služby</h4><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Servis</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Financování</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Doprava</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Reklamace</a></div><div><h4>Kontakt</h4><a href=\"tel:+420603123456\">+420 603 123 456</a><a href=\"mailto:showroom@biostech.cz\">showroom@biostech.cz</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Štoky 184, 582 53</a><a href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\">Po–Pá 8:00–17:00</a></div></div><div class=\"footer-bottom\"><div>© 2026 BiosImport s.r.o. · Bios TECH je značka skupiny Bios. · IČ 17543169</div><div class=\"pay-row\"><span class=\"pay-pill\">VISA</span><span class=\"pay-pill\">MASTERCARD</span><span class=\"pay-pill\">APPLE PAY</span><span class=\"pay-pill\">PŘEVOD</span><span class=\"pay-pill\">SPLÁTKY</span></div></div></div></footer>";

  function replaceLogo() {
    var siteName = document.querySelector('#header .site-name');
    if (!siteName) return;
    var link = siteName.querySelector('a');
    if (!link || link.dataset.btLogoDone) return;

    link.dataset.btLogoDone = 'true';
    link.innerHTML = '<img src="' + LOGO_URL + '" alt="BiosTech" class="bt-logo-img">';
  }


  var BT_FOOTER_LINKS = {
    'Malotraktory': '/malotraktory/',
    'Minibagry': '/minibagry/',
    'Nakladače': '/nakladace/',
    'Příslušenství': '/prislusenstvi/',
    'ACE traktory': '/ace-profi/',
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
    footerAccordion(wrap);
  }

  /* Mobil ≤768 px: sloupce patičky (Produkty, Showroom, Služby, Kontakt)
     jako akordeon — nadpis je tlačítko, odkazy se rozbalí. Na desktopu
     se nic nemění (CSS akordeonu platí jen na mobilu, klik se ignoruje). */
  function footerAccordion(root) {
    var mq = window.matchMedia ? window.matchMedia('(max-width: 768px)') : null;
    root.querySelectorAll('.footer-grid > div:not(.footer-intro)').forEach(function (col) {
      var h = col.querySelector('h4');
      if (!h) return;
      col.classList.add('bt-acc');
      h.setAttribute('role', 'button');
      h.setAttribute('tabindex', '0');
      h.setAttribute('aria-expanded', 'false');
      function toggle() {
        if (!mq || !mq.matches) return;
        var open = col.classList.toggle('is-open');
        h.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      h.addEventListener('click', toggle);
      h.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
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

  /* Mobil ≤768 px: nativní hamburger (v horní liště) přesuneme do řádku
     hlavičky vedle loga — Shoptet ho obsluhuje přes .toggle-window, takže
     funguje i po přesunu. Na širších šířkách ho vracíme zpět do lišty. */
  function mobileBurger() {
    var burger = document.querySelector('.responsive-tools a[data-target="navigation"]');
    var tools = document.querySelector('.responsive-tools');
    var headerTop = document.querySelector('#header .header-top');
    if (!burger || !tools || !headerTop || !window.matchMedia) return;
    var slot = document.createElement('div');
    slot.className = 'bt-mh-burger';
    var mq = window.matchMedia('(max-width: 768px)');
    function place() {
      if (mq.matches) {
        if (!slot.parentNode) headerTop.insertBefore(slot, headerTop.firstChild);
        slot.appendChild(burger);
      } else {
        tools.appendChild(burger);
        if (slot.parentNode) slot.parentNode.removeChild(slot);
      }
    }
    place();
    if (mq.addEventListener) mq.addEventListener('change', place);
    else if (mq.addListener) mq.addListener(place);

    // ikona košíku na mobilu rovnou na stránku košíku — nativní rychlý
    // náhled (cart-widget) je na mobilu nenastylovaný a nejde zavřít.
    // Shoptet ho otevírá přes třídu .toggle-window, tak ji na mobilu
    // odebereme (obyčejný odkaz na /kosik/) a na desktopu vrátíme.
    var cart = document.querySelector('#header a.cart-count');
    function cartMode() {
      if (!cart) return;
      cart.classList.toggle('toggle-window', !mq.matches);
    }
    cartMode();
    if (mq.addEventListener) mq.addEventListener('change', cartMode);
    else if (mq.addListener) mq.addListener(cartMode);
    if (cart) {
      cart.addEventListener('click', function (e) {
        if (!mq.matches) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        location.href = cart.getAttribute('href') || '/kosik/';
      }, true);
    }
  }

  /* Mobilní zásuvka menu (≤768 px) — varianta A: otevírání/zavírání
     dál řídí Shoptet (body.navigation-window-visible), my jen vložíme
     do #navigation vlastní obsah podle návrhu. Nativní seznam se na
     mobilu schová v Responsive.css, na desktopu je .bt-drawer skrytá. */
  var SVG_ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var SVG_ICON = {
    pin: '<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 14v7M10 12H3M14 12h7"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 1-5-5L13 2l1.7 4.3Z"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>'
  };
  function icon(name, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + SVG_ICON[name] + '</svg>';
  }
  var DRAWER_ROWS = [
    ['Malotraktory', 'Pro zahrady, sady a farmy', '/malotraktory/'],
    ['Minibagry', 'Kompaktní zemní práce', '/minibagry/'],
    ['Nakladače', 'Kolové a smykové', '/nakladace/'],
    ['Příslušenství', 'Nářadí a nástavby', '/prislusenstvi/'],
    ['ACE traktory', 'Vlajková řada · Centrála ČR', '/ace-profi/', true]
  ];

  function mobileDrawer() {
    var nav = document.getElementById('navigation');
    if (!nav || nav.querySelector('.bt-drawer')) return;
    var logo = document.querySelector('#header .site-name img');
    var account = nav.querySelector('.navigationActions a');
    var accountHref = account ? account.getAttribute('href') : '/login/';

    var rows = DRAWER_ROWS.map(function (r) {
      return '<a class="bt-drawer-row" href="' + r[2] + '"><span class="bt-drawer-row-text">' +
        '<b>' + r[0] + (r[3] ? '<i class="bt-drawer-ace-dot" aria-hidden="true"></i>' : '') + '</b>' +
        '<small>' + r[1] + '</small></span>' + SVG_ARROW + '</a>';
    }).join('');
    var tiles = [
      ['pin', 'Showroom Štoky', '/showroom-stoky/'],
      ['wheel', 'Testovací jízda', '/testovaci-jizda/'],
      ['wrench', 'Servis', '/servis/'],
      ['coin', 'Financování', '/financovani/'],
      ['user', 'Můj účet', accountHref]
    ].map(function (t) {
      return '<a class="bt-drawer-tile" href="' + t[2] + '">' + icon(t[0], 16) + '<span>' + t[1] + '</span></a>';
    }).join('');

    var drawer = document.createElement('div');
    drawer.className = 'bt-drawer';
    drawer.innerHTML =
      '<div class="bt-drawer-head">' +
        '<a href="/" class="bt-drawer-logo">' + (logo ? '<img src="' + logo.getAttribute('src') + '" alt="BiosTech">' : 'BiosTech') + '</a>' +
        '<button type="button" class="bt-drawer-close" aria-label="Zavřít menu"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '</div>' +
      '<div class="bt-drawer-body">' +
        '<div class="bt-drawer-label">Stroje</div>' + rows +
        '<div class="bt-drawer-tiles">' + tiles + '</div>' +
      '</div>' +
      '<div class="bt-drawer-foot">' +
        '<div>Zákaznická podpora · Po–Pá 8:00–17:00</div>' +
        '<a class="bt-drawer-call" href="tel:+420603123456">' + icon('phone', 18) + '<span>+420 603 123 456</span></a>' +
        '<a class="bt-drawer-mail" href="mailto:showroom@biostech.cz">showroom@biostech.cz</a>' +
      '</div>';
    nav.insertBefore(drawer, nav.firstChild);

    drawer.querySelector('.bt-drawer-close').addEventListener('click', function () {
      // zavřít nativní cestou (Shoptet uklidí i svůj stav); pojistka třídou
      var nativeClose = nav.querySelector('.navigation-close');
      if (nativeClose) nativeClose.click();
      document.body.classList.remove('navigation-window-visible');
    });
  }

  /* Desktop: rychlý náhled košíku po najetí (nativní #cart-widget) podle
     návrhu — hlavička s počtem položek, řádky produktů, doprava zdarma,
     celková cena a dvě tlačítka. Obsah Shoptet načítá AJAXem a při každé
     změně ho přepíše, proto doplňujeme po ShoptetDOMCartContentLoaded.
     Panel ukotvíme pod tlačítko košíku (hlavička je přilepená). */
  function cartWidget() {
    var w = document.getElementById('cart-widget');
    var btn = document.querySelector('#header a.cart-count');
    if (!w || !btn || !window.matchMedia) return;
    var desk = window.matchMedia('(min-width: 769px)');

    function place() {
      if (!desk.matches) return;
      var r = btn.getBoundingClientRect();
      w.style.setProperty('--bt-cw-top', Math.round(r.bottom + 12) + 'px');
      w.style.setProperty('--bt-cw-right', Math.round(document.documentElement.clientWidth - r.right) + 'px');
    }
    btn.addEventListener('mouseenter', place);
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    place();

    // tlačítka jsou mimo AJAXem přepisovanou část — stačí jednou
    var bw = w.querySelector('.cart-widget-button');
    var cont = bw && bw.querySelector('#continue-order-button');
    if (cont && !bw.querySelector('.bt-cw-checkout')) {
      cont.textContent = 'Do košíku';
      cont.classList.add('bt-cw-btn');
      bw.insertAdjacentHTML('beforeend',
        '<a href="/objednavka/krok-1/" class="bt-cw-btn bt-cw-checkout" rel="nofollow">K pokladně ' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>');
    }

    function polozky(n) {
      if (n === 1) return '1 položka';
      if (n >= 2 && n <= 4) return n + ' položky';
      return n + ' položek';
    }

    function enhance() {
      var inner = w.querySelector('.cart-widget-inner');
      if (!inner || inner.querySelector('.bt-cw-head')) return;
      var prods = inner.querySelectorAll('.cart-widget-product');
      if (!prods.length) return;

      inner.insertAdjacentHTML('afterbegin',
        '<div class="bt-cw-head"><strong>Košík</strong><span>' + polozky(prods.length) + '</span></div>');

      prods.forEach(function (p) {
        var amount = p.querySelector('input.amount');
        var name = p.querySelector('.cart-widget-product-name');
        var price = p.querySelector('[data-testid="cartWidgetProductPrice"]');
        var del = p.querySelector('.cart-widget-product-delete');
        if (name && amount) {
          name.insertAdjacentHTML('beforeend', '<span class="bt-cw-meta">' + (amount.value || '1') + ' ks</span>');
        }
        if (price && del) {
          price.classList.add('bt-cw-price');
          del.insertBefore(price, del.firstChild);
        }
      });

      var ship = inner.querySelector('.cart-free-shipping');
      if (ship && /zdarma!/i.test(ship.textContent)) {
        ship.insertAdjacentHTML('beforeend', '<span class="bt-cw-bar"><i></i></span>');
      }

      // celková cena = cena v tlačítku košíku (Shoptet ji drží aktuální)
      var total = document.querySelector('#header .cart-price');
      var totalText = total ? total.textContent.replace(/\s+/g, ' ').trim() : '';
      if (totalText) {
        inner.insertAdjacentHTML('beforeend',
          '<div class="bt-cw-total"><span>Celkem s DPH</span><strong>' + totalText + '</strong></div>');
      }
    }
    enhance();
    document.addEventListener('ShoptetDOMCartContentLoaded', enhance);
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
    // TEST: docasne vypnuto, overujeme nativni logo nahrane v Shoptetu
    // replaceLogo();
    replaceFooter();
    upgradeTopBar();
    upgradeSearch();
    mobileBurger();
    mobileDrawer();
    cartWidget();
    upgradeNav();
    watchMenuOverflow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
