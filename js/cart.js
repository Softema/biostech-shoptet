/* =============================================================
   BIOS TECH — cart.js
   Restyl nákupního košíku podle prototypu.
   Princip: nativní formuláře (množství, smazat položku, pokračovat)
   se FYZICKY PŘESOUVAJÍ do nového designu — žádná funkčnost se
   nekopíruje, jen přestěhuje (CSRF/AJAX zůstává beze změny).
   ============================================================= */
(function () {
  'use strict';

  if (!document.body.classList.contains('ordering-process')) { if (window.__btDone) window.__btDone(); return; }

  var VAT = 1.21;
  var PLUS_SVG = '<svg class="bt-plus-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';
  var MINUS_SVG = '<svg class="bt-plus-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path></svg>';
  var X_SVG = '<svg class="bt-plus-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>';
  var CHECK_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4 10-10"></path></svg>';
  var SHIELD_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6Z"></path><path d="m9 12 2 2 4-4"></path></svg>';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function fmtKc(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + '\u00A0Kč';
  }
  function parseKc(s) {
    var m = (s || '').replace(/\s|\u00A0/g, '').match(/[\d,.]+/);
    return m ? parseFloat(m[0].replace(',', '.')) : NaN;
  }
  function pluralPolozka(n) {
    if (n === 1) return 'položka připravená';
    if (n >= 2 && n <= 4) return 'položky připravené';
    return 'položek připravených';
  }
  function ensureIcon(el, svg) {
    if (!el) return;
    el.querySelectorAll('svg:not(.bt-plus-icon), i, .icon').forEach(function (n) { n.remove(); });
    if (!el.querySelector('svg.bt-plus-icon')) el.insertAdjacentHTML('beforeend', svg);
  }

  /* -----------------------------------------------------------
     Kroky objednávky (z nativního .cart-header)
     ----------------------------------------------------------- */
  function buildSteps() {
    var nativeSteps = Array.prototype.slice.call(document.querySelectorAll('.cart-header .step'));
    if (!nativeSteps.length) return '';
    var lis = nativeSteps.map(function (li) {
      var label = txt(li.querySelector('span')) || txt(li);
      var isActive = li.classList.contains('active');
      return '<li class="' + (isActive ? 'active' : '') + '"><span class="num">' + (nativeSteps.indexOf(li) + 1) + '</span> ' + esc(label) + '</li>';
    }).join('');
    return '<ol class="cart-steps">' + lis + '</ol>';
  }

  /* -----------------------------------------------------------
     Jedna položka košíku
     ----------------------------------------------------------- */
  function buildRow(row) {
    var imgEl = row.querySelector('.cart-p-image img');
    var linkEl = row.querySelector('.p-name a.main-link');
    var name = txt(linkEl);
    var url = linkEl ? linkEl.getAttribute('href') : '#';
    var imgSrc = imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : '';
    var sku = row.getAttribute('data-micro-sku') || '';
    var availEl = row.querySelector('.p-availability .availability-label');
    var availText = txt(availEl);
    var inStock = !/nedostupn/i.test(availText);

    var totalPriceEl = row.querySelector('.p-total .price-final');
    var totalPriceNum = parseKc(txt(totalPriceEl));

    var qtyForm = row.querySelector('.p-quantity form.quantity-form');
    var removeForm = row.querySelector('.p-total form.inline');

    var card = document.createElement('div');
    card.className = 'cart-row';
    card.innerHTML =
      '<div class="ci-image">' + (imgSrc ? '<img src="' + esc(imgSrc) + '" alt="' + esc(name) + '">' : '') + '</div>' +
      '<div class="ci-info">' +
        '<h4><a href="' + esc(url) + '">' + esc(name) + '</a></h4>' +
        '<div class="ci-meta"><span>BIOS TECH</span>' +
        (sku ? '<span class="sep">·</span><span>Kód ' + esc(sku) + '</span>' : '') +
        (availText ? '<span class="sep">·</span><span class="' + (inStock ? 'is-ok' : 'is-out') + '">' + esc(availText) + '</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="ci-qty"><span class="bt-slot-qty"></span></div>' +
      '<div class="ci-price">' + esc(txt(totalPriceEl)) + '<small>' + (isNaN(totalPriceNum) ? '' : fmtKc(totalPriceNum / VAT) + ' bez DPH') + '</small></div>' +
      '<div class="ci-remove-slot"><span class="bt-slot-remove"></span></div>';

    if (qtyForm) {
      var qtySlot = card.querySelector('.bt-slot-qty');
      qtySlot.parentNode.replaceChild(qtyForm, qtySlot);
      ensureIcon(qtyForm.querySelector('.increase'), PLUS_SVG);
      ensureIcon(qtyForm.querySelector('.decrease'), MINUS_SVG);
    }
    if (removeForm) {
      var removeSlot = card.querySelector('.bt-slot-remove');
      removeSlot.parentNode.replaceChild(removeForm, removeSlot);
      ensureIcon(removeForm.querySelector('.remove-item'), X_SVG);
      var btn = removeForm.querySelector('.remove-item');
      if (btn) btn.setAttribute('aria-label', 'Odebrat ' + name);
    }
    return card;
  }

  /* -----------------------------------------------------------
     Dárek zdarma + doprava zdarma (z reálných nativních dat)
     ----------------------------------------------------------- */
  function buildExtras() {
    var parts = [];
    var giftNameEl = document.querySelector('.free-gift-name');
    var giftName = txt(giftNameEl);
    if (giftName) {
      parts.push(
        '<div class="free-gift-box"><span class="star">★</span>' +
        '<div class="txt"><strong>Dárek zdarma!</strong><span>' + esc(giftName) + '</span></div>' +
        '<span class="check">' + CHECK_SVG + '</span></div>'
      );
    }
    var shipEl = document.querySelector('.extra.delivery');
    var shipText = txt(shipEl);
    if (shipText) {
      parts.push('<div class="free-ship-box">✓ ' + esc(shipText) + '</div>');
    }
    return parts.join('');
  }

  /* -----------------------------------------------------------
     Doplňky do košíku (fetch z kategorie Příslušenství)
     ----------------------------------------------------------- */
  function buildRelated(root) {
    var section = document.createElement('div');
    section.className = 'cart-related';
    section.innerHTML = '<div class="section-head"><div><span class="eyebrow">Mohlo by se hodit</span><h3>Příslušenství a doplňky</h3></div></div><div class="products"></div>';
    var grid = section.querySelector('.products');

    fetch('/prislusenstvi/', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        if (!html) { section.remove(); return; }
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var cards = Array.prototype.slice.call(doc.querySelectorAll('#products > .product')).slice(0, 2);
        if (!cards.length) { section.remove(); return; }
        cards.forEach(function (p) {
          var nameEl = p.querySelector('a.name [data-micro="name"]') || p.querySelector('a.name');
          var linkEl = p.querySelector('a.name');
          var imgEl = p.querySelector('a.image img');
          var priceEl = p.querySelector('.price-final');
          var skuEl = p.querySelector('.p-code [data-micro="sku"]');
          var name = txt(nameEl);
          var url = linkEl ? linkEl.getAttribute('href') : '#';
          var imgSrc = imgEl ? (imgEl.getAttribute('data-micro-image') || imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : '';
          var priceText = txt(priceEl);
          var sku = txt(skuEl);

          var card = document.createElement('article');
          card.className = 'product-card';
          card.style.cursor = 'pointer';
          card.innerHTML =
            '<div class="product-image"><a href="' + esc(url) + '" tabindex="-1" aria-hidden="true" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">' +
              (imgSrc ? '<img src="' + esc(imgSrc) + '" alt="' + esc(name) + '" loading="lazy" style="width:100%;height:100%;object-fit:contain;object-position:center bottom;">' : '') +
            '</a></div>' +
            '<div class="product-body"><div class="product-brand">BIOS TECH' + (sku ? ' · ' + esc(sku) : '') + '</div>' +
            '<h3 class="product-name"><a href="' + esc(url) + '" style="color:inherit;text-decoration:none;">' + esc(name) + '</a></h3>' +
            '<div class="product-foot"><div><div class="price-final">' + esc(priceText) + '</div></div>' +
            '<a class="add-btn" href="' + esc(url) + '" aria-label="Zobrazit ' + esc(name) + '"></a></div></div>';
          var addBtn = card.querySelector('.add-btn');
          ensureIcon(addBtn, PLUS_SVG);
          card.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            location.href = url;
          });
          grid.appendChild(card);
        });
      })
      .catch(function () { section.remove(); });

    root.appendChild(section);
  }

  /* -----------------------------------------------------------
     Souhrn objednávky (pravý sloupec)
     ----------------------------------------------------------- */
  function buildSummary() {
    var totalEl = document.querySelector('.price-wrapper .price');
    var totalNum = parseKc(txt(totalEl));
    var totalText = txt(totalEl) || (isNaN(totalNum) ? '' : fmtKc(totalNum));
    var vatText = isNaN(totalNum) ? '' : fmtKc(totalNum - totalNum / VAT);

    var shipEl = document.querySelector('.extra.delivery');
    var freeShip = !!txt(shipEl);

    var backLink = document.querySelector('.next-step .next-step-back');
    var forwardLink = document.querySelector('.next-step .next-step-forward');

    var html =
      '<h3>Souhrn objednávky</h3>' +
      (freeShip ? '<div class="ship-progress"><div class="ship-text"><strong>✓ Máte dopravu zdarma.</strong></div><div class="bar"><div style="width:100%;"></div></div></div>' : '') +
      '<div class="summary-row"><span>Mezisoučet</span><span style="font-weight:600;">' + esc(totalText) + '</span></div>' +
      '<div class="summary-row"><span>Doprava</span><span style="font-weight:600;">' + (freeShip ? '<span style="color:var(--bt-pea-deep);">Zdarma</span>' : '—') + '</span></div>' +
      '<div class="summary-row total"><span>Celkem s DPH</span><span>' + esc(totalText) + '</span></div>' +
      (vatText ? '<div class="vat-note">z toho DPH 21&nbsp;%: ' + esc(vatText) + '</div>' : '') +
      '<div class="ship-shield"><span class="icon">' + SHIELD_SVG + '</span><div><strong style="display:block;font-size:12px;">30 dní na vrácení</strong>Stroj nezůstane v garáži.</div></div>' +
      '<span class="bt-slot-forward"></span>' +
      '<span class="bt-slot-back"></span>' +
      '<div class="pay-badges"><span>VISA</span><span>MC</span><span>AMEX</span><span>APPLE&nbsp;PAY</span><span>PŘEVOD</span></div>';

    var aside = document.createElement('aside');
    aside.className = 'cart-summary';
    aside.innerHTML = html;

    if (forwardLink) {
      forwardLink.className = 'btn btn-checkout';
      forwardLink.innerHTML = 'Pokračovat k platbě <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
      aside.querySelector('.bt-slot-forward').replaceWith(forwardLink);
    }
    if (backLink) {
      backLink.className = 'btn-continue';
      backLink.textContent = '← Pokračovat v nákupu';
      aside.querySelector('.bt-slot-back').replaceWith(backLink);
    }
    return aside;
  }

  /* -----------------------------------------------------------
     Init
     ----------------------------------------------------------- */
  function buildEmptyState(cw) {
    var emptyBox = cw.querySelector('.cart-inner.cart-empty');
    var links = emptyBox ? Array.prototype.slice.call(emptyBox.querySelectorAll('.empty-cart-boxes a')) : [];
    var linksHtml = links.length
      ? '<div class="cart-empty-links">' + links.map(function (a) {
          return '<a href="' + esc(a.getAttribute('href')) + '">' + esc(txt(a)) + '</a>';
        }).join('') + '</div>'
      : '';
    return '<div class="cart-empty"><p>Váš košík je prázdný.</p>' + linksHtml + '<a class="btn" href="/">Zpět do obchodu</a></div>';
  }

  function buildPage(cw) {
    var rows = Array.prototype.slice.call(cw.querySelectorAll('table.cart-table tbody > tr[data-micro="cartItem"]'));

    var root = document.createElement('div');
    root.className = 'bt-scope-cart';
    root.id = 'bt-cart-root';

    var n = rows.length;
    var hero =
      '<div class="cart-hero"><div class="breadcrumb"><a href="/">Domů</a><span class="sep">/</span><span class="current">Košík</span></div>' +
      '<h1>Váš košík</h1>' +
      (n ? '<p class="cart-subtitle">' + n + ' ' + pluralPolozka(n) + ' na pořádnou jízdu.</p>' : '') +
      buildSteps() +
      '</div>';

    root.innerHTML = hero + '<div class="cart-layout"><div><div class="cart-table-card bt-slot-rows"></div><div class="cart-extras bt-slot-extras"></div><div class="bt-slot-related"></div></div><div class="bt-slot-summary"></div></div>';

    if (!rows.length) {
      var layoutEl = root.querySelector('.cart-layout');
      layoutEl.classList.add('is-empty');
      layoutEl.innerHTML = buildEmptyState(cw);
    } else {
      var rowsHost = root.querySelector('.bt-slot-rows');
      rows.forEach(function (row) { rowsHost.appendChild(buildRow(row)); });

      var extrasHtml = buildExtras();
      if (extrasHtml) root.querySelector('.bt-slot-extras').outerHTML = '<div class="cart-extras">' + extrasHtml + '</div>';
      else root.querySelector('.bt-slot-extras').remove();

      buildRelated(root.querySelector('.cart-layout > div'));

      root.querySelector('.bt-slot-summary').replaceWith(buildSummary());
    }

    cw.parentNode.insertBefore(root, cw);
    cw.style.display = 'none';
  }

  /* Shoptet mění obsah košíku (smazání položky, změna počtu) přes AJAX —
     stránka se znovu nenačte, takže náš jednorázový skript by o změně
     nevěděl. Proto vždy znovu sestavíme z AKTUÁLNÍHO nativního stavu. */
  function rebuild() {
    var stale = document.getElementById('bt-cart-root');
    if (stale) stale.remove();
    var cw = document.getElementById('cart-wrapper');
    if (!cw) return;
    cw.style.display = '';
    buildPage(cw);
  }

  function init() {
    rebuild();
    if (window.__btDone) window.__btDone();

    // sledujeme jen stabilního rodiče #cart-wrapper, ne celou stránku —
    // jinak by JAKÁKOLIV nesouvisející změna na webu (počítadlo v hlavičce,
    // chat widget, tracker) spustila přestavbu, která nenávratně zahodí
    // už přesunutá nativní tlačítka (pokračovat, smazat) uvnitř staré vrstvy
    var watchTarget = (document.getElementById('cart-wrapper') || {}).parentNode || document.body;
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        var root = document.getElementById('bt-cart-root');
        // smazaný uzel je v okamžiku, kdy pozorovatel běží, už vždy odpojený
        // ze stromu — kontrolovat lze jen rodiče (m.target), ten zůstává platný
        var relevant = mutations.some(function (m) { return !(root && root.contains(m.target)); });
        if (!relevant) return;
        // odpojit, ať naše vlastní úpravy DOMu nespustí pozorovatele samy na sebe
        observer.disconnect();
        rebuild();
        observer.observe(watchTarget, { childList: true, subtree: true });
      });
      observer.observe(watchTarget, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
