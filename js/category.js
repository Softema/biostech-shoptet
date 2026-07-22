/* =============================================================
   BIOS TECH — category.js
   Restyl stránky kategorie podle prototypu:
   1) tmavý cat-hero s textem podle URL slugu
   2) sidebar s filtry v designu (napojené na nativní Shoptet formy)
   3) toolbar (počet, řazení, mřížka/seznam)
   4) přestavba nativních dlaždic .product na designové karty
      (odkazy, ceny i košík zůstávají nativní = funkční)
   ============================================================= */
(function () {
  'use strict';

  if (!document.body.classList.contains('type-category')) return;

  /* -----------------------------------------------------------
     KONFIGURACE — texty hera podle slugu kategorie
     (badge = štítek linie na kartách produktů v této kategorii)
     ----------------------------------------------------------- */
  var CATS = {
    'rhinoceros-hobby': {
      title: 'Rhinoceros · Hobby řada',
      sub: 'Pro zahrady, sady a menší pozemky. Cesta začíná tady.',
      badge: { label: 'Hobby', cls: 'pl-hobby' }
    },
    'm3-hobby-profi': {
      title: 'M3 · Hobby/Profi',
      sub: 'Pro farmy, vinaře, sadaře a obce. Sílu spojuje s citlivostí.',
      badge: { label: 'Hobby/Profi', cls: 'pl-profi' }
    },
    'ace-profi': {
      title: 'ACE · Profi',
      sub: 'Profesionální traktory. Vlajková řada bez kompromisů. Centrála ACE pro ČR ve Štokách.',
      badge: { label: 'ACE', cls: 'pl-ace' },
      aceMeta: true
    },
    'minibagry': {
      title: 'Minibagry',
      sub: 'Nová generace strojů pro vaši práci. Vyberte. Porovnejte. Vyzkoušejte.',
      badge: { label: 'Minibagry', cls: '' }
    },
    'nakladace': {
      title: 'Nakladače',
      sub: 'Kompaktní síla pro stavbu i statek.',
      badge: { label: 'Nakladače', cls: '' }
    },
    'prislusenstvi': {
      title: 'Příslušenství',
      sub: 'Nová generace strojů pro vaši práci. Vyberte. Porovnejte. Vyzkoušejte.',
      badge: { label: 'Příslušenství', cls: '' }
    }
  };

  /* Specifikace na kartách (chipy Výkon/Pohon/Hmotnost).
     Výpis kategorie tahle data nativně neobsahuje, proto mapa
     podle KÓDU produktu (sku). Doplň řádek pro každý produkt. */
  var SPEC_MAP = {
    '45': [['Výkon', '20 HP'], ['Pohon', '4×4'], ['Hmotnost', '720 kg']],
    '48': [['Výkon', '25 HP'], ['Pohon', '4×4'], ['Hmotnost', '780 kg']]
  };

  var VAT = 1.21;

  var ALL_CATEGORIES = [
    ['rhinoceros-hobby', 'Rhinoceros — Hobby'],
    ['m3-hobby-profi', 'M3 — Hobby/Profi'],
    ['ace-profi', 'ACE Profi'],
    ['minibagry', 'Minibagry'],
    ['nakladace', 'Nakladače'],
    ['prislusenstvi', 'Příslušenství']
  ];

  /* -----------------------------------------------------------
     Helpers
     ----------------------------------------------------------- */
  function slug() {
    var m = location.pathname.match(/^\/([^\/]+)\//);
    return m ? m[1] : '';
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function fmtKc(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + '\u00A0Kč';
  }
  function pluralStroj(n) {
    if (n === 1) return 'stroj';
    if (n >= 2 && n <= 4) return 'stroje';
    return 'strojů';
  }
  function totalCount() {
    var el = document.querySelector('#category-header .listItemsTotal strong');
    if (el) { var n = parseInt(txt(el), 10); if (!isNaN(n)) return n; }
    return document.querySelectorAll('#products > .product').length;
  }
  function urlParam(name) {
    var m = location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  var CUR = slug();
  var CFG = CATS[CUR] || {
    title: txt(document.querySelector('h1.category-title')) || 'Kategorie',
    sub: '',
    badge: { label: '', cls: '' }
  };

  /* -----------------------------------------------------------
     1) CAT HERO
     ----------------------------------------------------------- */
  function buildHero() {
    if (document.getElementById('bt-cat-hero')) return;
    var wrapper = document.getElementById('content-wrapper');
    if (!wrapper || !wrapper.parentNode) return;

    var n = totalCount();
    var metaAce = CFG.aceMeta
      ? '<span>·</span><span class="cat-meta-ace">★ Centrála ACE pro ČR</span>'
      : '';

    var host = document.createElement('div');
    host.className = 'bt-scope';
    host.id = 'bt-cat-hero';
    host.innerHTML =
      '<section class="cat-hero"><div class="container">' +
        '<div class="breadcrumb">' +
          '<a href="/">Domů</a><span class="sep">/</span>' +
          '<span class="current">' + esc(CFG.title) + '</span>' +
        '</div>' +
        '<h1>' + esc(CFG.title) + '</h1>' +
        (CFG.sub ? '<p>' + esc(CFG.sub) + '</p>' : '') +
        '<div class="cat-meta">' +
          '<span><strong>' + n + '</strong> ' + pluralStroj(n) + '</span>' +
          '<span>·</span><span>Showroom Štoky</span>' +
          '<span>·</span><span>Testovací jízda zdarma</span>' +
          metaAce +
        '</div>' +
      '</div></section>';
    wrapper.parentNode.insertBefore(host, wrapper);
  }

  /* -----------------------------------------------------------
     2) SIDEBAR
     ----------------------------------------------------------- */
  function filterOption(type, name, label, extraHtml, checked, countSlug) {
    return '<label class="filter-option" ' + (countSlug ? 'data-nav-slug="' + esc(countSlug) + '"' : '') + '>' +
      '<span class="label-wrap">' +
        '<input type="' + type + '"' + (name ? ' name="' + name + '"' : '') + (checked ? ' checked' : '') + '>' +
        '<span class="filter-' + (type === 'radio' ? 'radio' : 'checkbox') + '"></span>' +
        '<span>' + label + (extraHtml || '') + '</span>' +
      '</span>' +
      (countSlug ? '<span class="count" data-count-slug="' + esc(countSlug) + '"></span>' : '') +
    '</label>';
  }

  function buildSidebarHtml() {
    var lines =
      filterOption('radio', 'bt-line', 'Všechny linie', '', false, null) +
      filterOption('radio', 'bt-line', 'Hobby (Rhinoceros)', '', CUR === 'rhinoceros-hobby', 'rhinoceros-hobby') +
      filterOption('radio', 'bt-line', 'Hobby/Profi (M3)', '', CUR === 'm3-hobby-profi', 'm3-hobby-profi') +
      filterOption('radio', 'bt-line', 'ACE Profi', '<span class="filter-ace-dot">●</span>', CUR === 'ace-profi', 'ace-profi');

    var cats = ALL_CATEGORIES.map(function (c) {
      return filterOption('checkbox', '', esc(c[1]), '', CUR === c[0], c[0]);
    }).join('');

    var hp = ['20-30 HP', '30-50 HP', '50-75 HP', '75+ HP'].map(function (l) {
      return filterOption('checkbox', '', l, '', false, null);
    }).join('');

    var stockChecked = urlParam('stock') === '1';

    return '' +
      '<div class="filter-block"><div class="filter-title">Produktová linie</div>' + lines + '</div>' +
      '<div class="filter-block"><div class="filter-title">Kategorie</div>' + cats + '</div>' +
      '<div class="filter-block"><div class="filter-title">Výkon (HP)</div>' + hp + '</div>' +
      '<div class="filter-block"><div class="filter-title">Cena</div>' +
        '<div class="price-range">' +
          '<input type="text" inputmode="numeric" placeholder="Od" id="bt-price-from">' +
          '<input type="text" inputmode="numeric" placeholder="Do" id="bt-price-to">' +
        '</div>' +
        '<div class="filter-note">Hodnoty v Kč s DPH</div>' +
      '</div>' +
      '<div class="filter-block"><div class="filter-title">Dostupnost</div>' +
        filterOption('checkbox', '', 'Pouze skladem', '', stockChecked, null).replace('<label class="filter-option" >', '<label class="filter-option" id="bt-stock-filter">') +
        filterOption('checkbox', '', 'Testovací jízda k dispozici', '', false, null) +
      '</div>' +
      '<a class="btn btn-ghost" style="width:100%;margin-top:16px;" href="/' + esc(CUR) + '/">Resetovat filtry</a>';
  }

  function wireSidebar(aside) {
    // navigace klikem na linii/kategorii
    aside.querySelectorAll('[data-nav-slug]').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        var s = opt.getAttribute('data-nav-slug');
        if (s && s !== CUR) location.href = '/' + s + '/';
      });
    });

    // cena -> nativní #price-filter-form
    function applyPrice() {
      var form = document.getElementById('price-filter-form');
      if (!form) return;
      var from = parseInt((document.getElementById('bt-price-from').value || '').replace(/\D/g, ''), 10);
      var to = parseInt((document.getElementById('bt-price-to').value || '').replace(/\D/g, ''), 10);
      var minEl = document.getElementById('price-value-min');
      var maxEl = document.getElementById('price-value-max');
      var boundMin = parseInt(txt(document.getElementById('categoryMinValue')), 10);
      var boundMax = parseInt(txt(document.getElementById('categoryMaxValue')), 10);
      if (minEl) minEl.value = !isNaN(from) ? from : (!isNaN(boundMin) ? boundMin : 0);
      if (maxEl) maxEl.value = !isNaN(to) ? to : (!isNaN(boundMax) ? boundMax : 99999999);
      form.submit();
    }
    ['bt-price-from', 'bt-price-to'].forEach(function (id) {
      var inp = aside.querySelector('#' + id);
      if (inp) inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') applyPrice();
      });
      if (inp) inp.addEventListener('change', applyPrice);
    });

    // pouze skladem -> nativní checkbox #stock (má data-url)
    var stockOpt = aside.querySelector('#bt-stock-filter');
    if (stockOpt) {
      stockOpt.addEventListener('click', function (e) {
        e.preventDefault();
        var native = document.getElementById('stock');
        if (urlParam('stock') === '1') {
          location.href = location.pathname + location.search.replace(/[?&]stock=1/, '').replace(/^&/, '?');
        } else if (native && !native.disabled && native.getAttribute('data-url')) {
          location.href = native.getAttribute('data-url');
        }
      });
    }
  }

  /* počty produktů v ostatních kategoriích (fetch + sessionStorage cache) */
  function fillCounts(scopeEl) {
    var spans = scopeEl.querySelectorAll('[data-count-slug]');
    spans.forEach(function (span) {
      var s = span.getAttribute('data-count-slug');
      if (s === CUR) { span.textContent = totalCount(); return; }
      var cacheKey = 'btCatCount:' + s;
      var cached = null;
      try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}
      if (cached !== null) { span.textContent = cached; return; }
      fetch('/' + s + '/', { credentials: 'same-origin' })
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) {
          var m = html.match(/listItemsTotal[^>]*>\s*<strong>\s*(\d+)/);
          var n = m ? m[1] : '';
          try { sessionStorage.setItem(cacheKey, n); } catch (e) {}
          span.textContent = n;
        })
        .catch(function () { /* počet prostě nezobrazíme */ });
    });
  }

  /* -----------------------------------------------------------
     3) TOOLBAR
     ----------------------------------------------------------- */
  var SORTS = [
    ['', 'Doporučené'],
    ['price', 'Cena ↑'],
    ['-price', 'Cena ↓'],
    ['name', 'Název']
  ];

  function buildToolbarHtml() {
    var n = totalCount();
    var cur = urlParam('order') || '';
    var opts = SORTS.map(function (s) {
      return '<option value="' + s[0] + '"' + (s[0] === cur ? ' selected' : '') + '>' + s[1] + '</option>';
    }).join('');

    var chips = '';
    if (urlParam('stock') === '1') chips += '<span class="filter-chip" data-chip="stock">Skladem <span class="x">×</span></span>';

    var svgGrid = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>';
    var svgList = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6"></rect><rect x="3" y="14" width="18" height="6"></rect></svg>';

    return '<div class="category-toolbar">' +
      '<div>' +
        '<div class="result-count"><strong>' + n + '</strong> ' + pluralStroj(n) + '</div>' +
        (chips ? '<div class="active-filters">' + chips + '</div>' : '') +
      '</div>' +
      '<div class="toolbar-right">' +
        '<label>Řadit:</label>' +
        '<select id="bt-sort">' + opts + '</select>' +
        '<div class="view-toggle">' +
          '<button type="button" class="active" data-view="grid" aria-label="Mřížka">' + svgGrid + '</button>' +
          '<button type="button" data-view="list" aria-label="Seznam">' + svgList + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function wireToolbar(col) {
    var sel = col.querySelector('#bt-sort');
    if (sel) sel.addEventListener('change', function () {
      var v = sel.value;
      var url = '/' + CUR + '/';
      var keep = urlParam('stock') === '1' ? 'stock=1' : '';
      var q = [];
      if (v) q.push('order=' + v);
      if (keep) q.push(keep);
      location.href = url + (q.length ? '?' + q.join('&') : '');
    });

    var chipStock = col.querySelector('[data-chip="stock"] .x');
    if (chipStock) chipStock.addEventListener('click', function () {
      location.href = location.pathname + location.search.replace(/[?&]stock=1/, '').replace(/^&/, '?');
    });

    var products = document.getElementById('products');
    col.querySelectorAll('.view-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        col.querySelectorAll('.view-toggle button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (!products) return;
        var list = btn.getAttribute('data-view') === 'list';
        products.classList.toggle('bt-view-list', list);
        try { sessionStorage.setItem('btCatView', list ? 'list' : 'grid'); } catch (e) {}
      });
    });
    var savedView = null;
    try { savedView = sessionStorage.getItem('btCatView'); } catch (e) {}
    if (savedView === 'list' && products) {
      products.classList.add('bt-view-list');
      col.querySelectorAll('.view-toggle button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-view') === 'list');
      });
    }
  }

  /* -----------------------------------------------------------
     4) TRANSFORMACE PRODUKTŮ (.product -> designová karta)
     ----------------------------------------------------------- */
  function transformProduct(product) {
    if (product.dataset.btDone) return;
    product.dataset.btDone = 'true';

    var p = product.querySelector('.p');
    if (!p) return;

    var nameEl = p.querySelector('a.name [data-micro="name"]') || p.querySelector('a.name');
    var linkEl = p.querySelector('a.name');
    var imgEl = p.querySelector('a.image img');
    var offerEl = p.querySelector('[data-micro="offer"]');
    var priceEl = p.querySelector('.price-final strong') || p.querySelector('.price-final');
    var skuEl = p.querySelector('.p-code [data-micro="sku"]');
    var availEl = p.querySelector('.availability span') || p.querySelector('.availability');
    var formEl = p.querySelector('form.pr-action');

    var name = txt(nameEl);
    var url = linkEl ? linkEl.getAttribute('href') : '#';
    var imgSrc = imgEl ? (imgEl.getAttribute('data-micro-image') || imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : '';
    var sku = txt(skuEl);
    var availText = txt(availEl) || '';
    var inStock = offerEl
      ? /InStock/i.test(offerEl.getAttribute('data-micro-availability') || '')
      : !/nedostupn/i.test(availText);
    var priceText = txt(priceEl);
    var priceNum = parseInt((offerEl && offerEl.getAttribute('data-micro-price') || priceText).replace(/[^\d]/g, ''), 10);
    // data-micro-price je "277000.00" -> useknout haléře
    if (offerEl && offerEl.getAttribute('data-micro-price')) {
      priceNum = Math.round(parseFloat(offerEl.getAttribute('data-micro-price')));
    }

    var flags = [];
    p.querySelectorAll('.flags .flag, .extra-flags .flag, .flag-default, .flag-action').forEach(function (f) {
      var t = txt(f); if (t) flags.push(t);
    });

    var specs = SPEC_MAP[sku] || null;

    var badge = CFG.badge && CFG.badge.label
      ? '<span class="product-line ' + esc(CFG.badge.cls) + '">' + esc(CFG.badge.label) + '</span>'
      : '';
    var flagsHtml = flags.length
      ? '<div class="product-flags">' + flags.map(function (f) { return '<span class="flag">' + esc(f) + '</span>'; }).join('') + '</div>'
      : '';
    var specsHtml = specs
      ? '<div class="product-specs">' + specs.map(function (s) {
          return '<span class="spec">' + esc(s[0]) + ': <strong>' + esc(s[1]) + '</strong></span>';
        }).join('') + '</div>'
      : '';
    var bezDph = (!isNaN(priceNum) && priceNum > 0)
      ? '<span class="price-additional">' + fmtKc(priceNum / VAT) + ' bez DPH</span>'
      : '';
    var availHtml = '<span class="availability-label' + (inStock ? '' : ' is-out') + '">' +
      esc(availText || (inStock ? 'Skladem' : 'Nedostupné')) + '</span>';

    var card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML =
      '<div class="product-image">' +
        badge + flagsHtml +
        '<a href="' + esc(url) + '" tabindex="-1" aria-hidden="true" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">' +
          (imgSrc ? '<img src="' + esc(imgSrc) + '" alt="' + esc(name) + '" loading="lazy">' : '') +
        '</a>' +
      '</div>' +
      '<div class="product-body">' +
        '<div class="product-brand">BIOS TECH' + (sku ? ' · ' + esc(sku) : '') + '</div>' +
        '<h3 class="product-name"><a href="' + esc(url) + '" style="color:inherit;text-decoration:none;">' + esc(name) + '</a></h3>' +
        specsHtml +
        '<div class="product-foot">' +
          '<div>' +
            availHtml +
            '<div class="price-final">' + esc(priceText) + '</div>' +
            bezDph +
          '</div>' +
          '<span class="bt-card-cart"></span>' +
        '</div>' +
      '</div>';

    // košík: přesuneme nativní form (CSRF + Shoptet ajax zůstávají funkční)
    var cartSlot = card.querySelector('.bt-card-cart');
    if (formEl) {
      cartSlot.parentNode.replaceChild(formEl, cartSlot);
    } else {
      var fallback = document.createElement('a');
      fallback.className = 'add-btn';
      fallback.setAttribute('href', url);
      fallback.setAttribute('aria-label', 'Zobrazit ' + name);
      fallback.textContent = '+';
      cartSlot.parentNode.replaceChild(fallback, cartSlot);
    }

    // celá karta kliká na detail (kromě odkazů a tlačítek)
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button, form, input, select, label')) return;
      location.href = url;
    });

    product.innerHTML = '';
    product.appendChild(card);
  }

  function transformAll() {
    document.querySelectorAll('#products > .product').forEach(transformProduct);
  }

  /* -----------------------------------------------------------
     5) LAYOUT + Načíst další stroje
     ----------------------------------------------------------- */
  function nextPageLink() {
    return document.querySelector('.pagination a[rel="next"], .pagination .next a, a.pagination-next');
  }

  function buildLayout() {
    if (document.getElementById('bt-cat-layout')) return;
    var contentWrap = document.querySelector('.category-content-wrapper') || document.getElementById('content');
    var products = document.getElementById('products');
    if (!contentWrap || !products) return;

    var host = document.createElement('div');
    host.className = 'bt-scope';
    host.id = 'bt-cat-layout';

    var layout = document.createElement('div');
    layout.className = 'category-layout';

    var aside = document.createElement('aside');
    aside.className = 'sidebar-filters';
    aside.innerHTML = buildSidebarHtml();

    var col = document.createElement('div');
    col.className = 'bt-products-col';
    col.innerHTML = buildToolbarHtml();

    layout.appendChild(aside);
    layout.appendChild(col);
    host.appendChild(layout);
    contentWrap.appendChild(host);

    // přesun nativního gridu do našeho sloupce
    col.appendChild(products);

    // prázdná kategorie
    if (!products.querySelector('.product')) {
      var empty = document.createElement('div');
      empty.className = 'bt-cat-empty';
      empty.textContent = 'V této kategorii zatím nejsou žádné stroje.';
      col.appendChild(empty);
    }

    // Načíst další stroje — jen pokud existuje další stránka
    var next = nextPageLink();
    if (next) {
      var wrap = document.createElement('div');
      wrap.className = 'bt-load-more-wrap';
      var btn = document.createElement('button');
      btn.className = 'btn btn-ghost btn-lg';
      btn.type = 'button';
      btn.textContent = 'Načíst další stroje';
      wrap.appendChild(btn);
      col.appendChild(wrap);

      btn.addEventListener('click', function () {
        var link = nextPageLink();
        var href = btn.dataset.next || (link && link.getAttribute('href'));
        if (!href) { wrap.remove(); return; }
        btn.disabled = true;
        fetch(href, { credentials: 'same-origin' })
          .then(function (r) { return r.text(); })
          .then(function (html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            doc.querySelectorAll('#products > .product').forEach(function (np) {
              var node = document.importNode(np, true);
              products.appendChild(node);
              transformProduct(node);
            });
            var nn = doc.querySelector('.pagination a[rel="next"], .pagination .next a, a.pagination-next');
            if (nn) { btn.dataset.next = nn.getAttribute('href'); btn.disabled = false; }
            else { wrap.remove(); }
          })
          .catch(function () { location.href = href; });
      });
    }
    // nativní stránkování schovat (nahrazuje ho tlačítko)
    document.querySelectorAll('.pagination').forEach(function (el) { el.style.display = 'none'; });

    wireSidebar(aside);
    wireToolbar(col);
    fillCounts(aside);
  }

  /* -----------------------------------------------------------
     Init
     ----------------------------------------------------------- */
  function init() {
    buildHero();
    transformAll();
    buildLayout();

    // pojistka: kdyby Shoptet do #products cokoliv doplnil ajaxem
    var products = document.getElementById('products');
    if (products && window.MutationObserver) {
      new MutationObserver(function () {
        document.querySelectorAll('#products > .product:not([data-bt-done])').forEach(transformProduct);
      }).observe(products, { childList: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
