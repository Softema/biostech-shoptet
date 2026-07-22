/* =============================================================
   BIOS TECH — detail.js
   Restyl stránky detailu produktu podle prototypu.
   Princip: postavíme novou designovou vrstvu (.bt-scope-detail),
   ale nativní Shoptet formulář (varianty, množství, košík,
   diskuze) FYZICKY PŘESUNEME dovnitř — žádná funkčnost se nekopíruje,
   jen se přestěhuje, takže CSRF/AJAX/varianty fungují beze změny.
   ============================================================= */
(function () {
  'use strict';

  if (!document.body.classList.contains('type-detail')) return;

  var VAT = 1.21;
  var PLUS_SVG = '<svg class="bt-plus-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function fmtKc(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + '\u00A0Kč';
  }
  function ensurePlusIcon(el) {
    if (!el) return;
    el.querySelectorAll('svg:not(.bt-plus-icon), i, .icon, .spinner, .loader').forEach(function (n) { n.remove(); });
    if (!el.querySelector('svg.bt-plus-icon')) el.insertAdjacentHTML('afterbegin', PLUS_SVG + ' ');
  }
  function guardIcon(el) {
    if (!el) return;
    ensurePlusIcon(el);
    if (window.MutationObserver && !el.dataset.btIconGuard) {
      el.dataset.btIconGuard = 'true';
      new MutationObserver(function () { ensurePlusIcon(el); }).observe(el, { childList: true });
    }
  }
  function triggerChange(el) {
    if (window.jQuery) { window.jQuery(el).trigger('change'); }
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  var form = document.getElementById('product-detail-form') || document.querySelector('form.pr-action');
  if (!form) return; // bez formuláře nemá smysl stránku přestavovat

  /* -----------------------------------------------------------
     Sběr nativních dat
     ----------------------------------------------------------- */
  var h1El = document.querySelector('.p-detail-inner-header h1');
  var productName = txt(h1El);

  var breadcrumbLinks = Array.prototype.slice.call(document.querySelectorAll('.breadcrumbs-wrapper .breadcrumbs > span[itemprop="itemListElement"]'));
  // poslední kategorie před samotným produktem (2. až předposlední span)
  var lineLabel = '';
  var lineHref = '';
  if (breadcrumbLinks.length > 1) {
    var catSpan = breadcrumbLinks[breadcrumbLinks.length - 2];
    var a = catSpan.querySelector('a');
    if (a) { lineLabel = txt(a); lineHref = a.getAttribute('href'); }
  }
  // viditelný text "Domů" místo sr-only ikony
  var homeLink = document.querySelector('.breadcrumbs-wrapper .navigation-home-icon');
  if (homeLink && !homeLink.dataset.btFixed) {
    homeLink.dataset.btFixed = 'true';
    homeLink.textContent = 'Domů';
  }

  var mainImgEl = document.querySelector('a.p-main-image img');
  var mainImgSrc = mainImgEl ? mainImgEl.getAttribute('src') : '';
  var thumbLinks = Array.prototype.slice.call(document.querySelectorAll('.p-thumbnails a.p-thumbnail'));

  var flagEl = document.querySelector('.p-image .flag, .p-image .p-flags .flag, .extra-flags .flag');
  var flagText = txt(flagEl);

  var shortDescEl = document.querySelector('.p-short-description');
  var shortDescHtml = shortDescEl ? shortDescEl.innerHTML : '';

  var warrantyEl = form.querySelector('meta[itemprop="warranty"]');
  var warrantyText = warrantyEl ? warrantyEl.getAttribute('content') : '';

  var skuMetaEl = form.querySelector('meta[itemprop="sku"]');
  var defaultSku = skuMetaEl ? skuMetaEl.getAttribute('content') : '';

  var select = form.querySelector('select[name="priceId"]');
  var qtyBlock = form.querySelector('.quantity');
  var submitBtn = form.querySelector('.add-to-cart-button[type="submit"]') || form.querySelector('[data-testid="buttonAddToCart"]');

  var variantRowTh = null;
  Array.prototype.forEach.call(form.querySelectorAll('table.detail-parameters tr'), function (row) {
    var th = row.querySelector('th');
    if (th && select && row.contains(select)) variantRowTh = th;
  });
  var variantLabel = variantRowTh ? txt(variantRowTh) : 'Varianta';

  /* -----------------------------------------------------------
     Benefity — z nativních benefitBanner bloků na stránce
     ----------------------------------------------------------- */
  var benefitItems = [];
  document.querySelectorAll('.benefitBanner__item').forEach(function (it) {
    var title = txt(it.querySelector('.benefitBanner__title'));
    var data = txt(it.querySelector('.benefitBanner__data'));
    if (title) benefitItems.push(title + (data ? ' — ' + data : ''));
  });
  if (warrantyText) benefitItems.unshift('Záruka ' + warrantyText);
  benefitItems.push('Showroom Štoky');
  benefitItems.push('Testovací jízda zdarma');
  benefitItems = benefitItems.slice(0, 6);

  var BENEFIT_ICONS = {
    default: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4 10-10"></path></svg>'
  };

  /* -----------------------------------------------------------
     Popis + parametry (z nativního obsahu tabu "Popis")
     ----------------------------------------------------------- */
  var basicDescEl = document.querySelector('#description .basic-description');
  var extendedTable = document.querySelector('#description .extended-description table.detail-parameters');
  var specRows = [];
  if (extendedTable) {
    extendedTable.querySelectorAll('tr').forEach(function (row) {
      var key = txt(row.querySelector('th'));
      var val = txt(row.querySelector('td'));
      if (key && val) specRows.push([key, val]);
    });
  }

  var discussionEl = document.getElementById('productDiscussion');

  /* -----------------------------------------------------------
     Hero / p-info stavba
     ----------------------------------------------------------- */
  function buildGallery() {
    var thumbsHtml = thumbLinks.map(function (a, i) {
      var img = a.querySelector('img');
      var alt = img ? img.getAttribute('alt') : '';
      var small = img ? (img.getAttribute('data-src') || img.getAttribute('src')) : '';
      var big = a.getAttribute('href') || small;
      return '<div class="p-thumb' + (i === 0 ? ' active' : '') + '" data-big="' + esc(big) + '" data-alt="' + esc(alt) + '">' +
        (small ? '<img src="' + esc(small) + '" alt="' + esc(alt) + '" loading="lazy">' : '') +
      '</div>';
    }).join('');

    return '<div class="p-gallery">' +
      (thumbsHtml ? '<div class="p-thumbs">' + thumbsHtml + '</div>' : '') +
      '<div class="p-main-img">' +
        (flagText ? '<div class="p-badges"><span class="flag">' + esc(flagText) + '</span></div>' : '') +
        (mainImgSrc ? '<img src="' + esc(mainImgSrc) + '" alt="' + esc(productName) + '">' : '') +
        '<button type="button" class="p-zoom" aria-label="Přiblížit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5M8 11h6M11 8v6"></path></svg></button>' +
      '</div>' +
    '</div>';
  }

  function wireGallery(host) {
    var mainImg = host.querySelector('.p-main-img img');
    var zoomBtn = host.querySelector('.p-zoom');
    host.querySelectorAll('.p-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        host.querySelectorAll('.p-thumb').forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
        var big = thumb.getAttribute('data-big');
        if (mainImg && big) { mainImg.src = big; mainImg.alt = thumb.getAttribute('data-alt') || productName; }
      });
    });
    if (zoomBtn) zoomBtn.addEventListener('click', function () {
      var src = mainImg ? mainImg.src : '';
      if (src) window.open(src, '_blank');
    });
  }

  function parseOptions() {
    if (!select) return [];
    // data-stock nemá spolehlivé znaménko (viděno: obě varianty mají záporné
    // hodnoty bez ohledu na skutečnou dostupnost) — skutečnou dostupnost čteme
    // z nativních .availability-value špiček, seřazených stejně jako <option>
    var availSpans = Array.prototype.slice.call(
      document.querySelectorAll('.availability-value > .choose-variant.no-display')
    );
    var i = 0;
    return Array.prototype.map.call(select.querySelectorAll('option'), function (o) {
      var raw = o.textContent.replace(/\s+/g, ' ').trim();
      var label = raw.split(' - ')[0].trim() || raw;
      var isPlaceholder = o.value === '';
      var availText = '', inStock = false;
      if (!isPlaceholder) {
        var span = availSpans[i]; i++;
        if (span) {
          var labelEl = span.querySelector('.availability-label');
          var amountEl = span.querySelector('.availability-amount');
          availText = (labelEl ? txt(labelEl) : '') + (amountEl ? ' ' + txt(amountEl) : '');
          inStock = /sklad/i.test(availText);
        } else {
          inStock = parseInt(o.getAttribute('data-stock') || '0', 10) > 0;
          availText = inStock ? 'Skladem' : 'Momentálně nedostupné';
        }
      }
      return {
        value: o.value,
        label: label,
        disabled: !!o.getAttribute('data-disable-button'),
        price: parseFloat(o.getAttribute('data-customerprice') || 'NaN'),
        inStock: inStock,
        availText: availText,
        codeid: o.getAttribute('data-codeid') || ''
      };
    }).filter(function (o) { return o.value !== ''; });
  }

  function buildInfo() {
    var opts = parseOptions();
    var priceHolder = document.querySelector('.price-final-holder.default-variant') || document.querySelector('.price-final-holder');
    var initialPriceText = txt(priceHolder);
    var availHolder = document.querySelector('.availability-value .default-variant, .availability-value .availability-label');
    var initialAvailText = txt(availHolder) || 'Zvolte variantu';

    var variantHtml = opts.length
      ? '<div class="variant-block"><div class="variant-label">' + esc(variantLabel) +
        '<span class="selected" data-role="variant-selected"></span></div><div class="variant-row">' +
        opts.map(function (o) {
          return '<button type="button" class="variant-chip' + (o.disabled ? '' : '') + '" data-value="' + esc(o.value) + '"' +
            (!o.inStock ? ' data-outofstock="1"' : '') + '>' + esc(o.label) + '</button>';
        }).join('') + '</div></div>'
      : '';

    return '' +
      '<span class="p-line-pill"><span class="dot"></span> BIOS TECH' + (lineLabel ? ' · ' + esc(lineLabel) : '') + '</span>' +
      '<h1>' + esc(productName) + '</h1>' +
      '<div class="p-meta">' +
        '<span class="availability-label" data-role="avail-text">' + esc(initialAvailText) + '</span>' +
        '<span>·</span><span data-role="sku-text">Kód: ' + esc(defaultSku || '—') + '</span>' +
      '</div>' +
      (shortDescHtml ? '<div class="p-short">' + shortDescHtml + '</div>' : '') +
      '<div class="p-price-block">' +
        '<div><div class="price-final" data-role="price-text">' + esc(initialPriceText || '—') + '</div>' +
        '<span class="price-additional" data-role="price-vat">&nbsp;</span></div>' +
        '<a class="price-finance-link" href="/financovani/">Zjistit možnosti financování →</a>' +
      '</div>' +
      variantHtml +
      '<div class="p-cta-row"><span class="bt-slot-qty"></span><span class="bt-slot-submit"></span>' +
        '<button type="button" class="btn-wishlist" aria-label="Oblíbené"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-9-9.5C1.5 7.5 4.5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3.5 0 6.5 3.5 5 7.5-2 5-9 9.5-9 9.5Z"></path></svg></button>' +
      '</div>' +
      (benefitItems.length ? '<div class="p-benefits">' + benefitItems.map(function (b) {
        return '<div class="p-benefit"><span class="b-icon">' + BENEFIT_ICONS.default + '</span> ' + esc(b) + '</div>';
      }).join('') + '</div>' : '') +
      '<div class="p-testdrive-box">' +
        '<div class="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 9h18M8 3v4M16 3v4"></path></svg></div>' +
        '<div class="txt"><div class="title">Chcete si ' + esc(productName) + ' vyzkoušet?</div>' +
        '<div class="sub">Testovací jízda ve Štokách. Po rezervaci zdarma.</div></div>' +
        '<a class="btn btn-sm btn-ghost" href="/testovaci-jizda/">Rezervovat</a>' +
      '</div>';
  }

  function updateFromOption(opt, infoEl) {
    var priceEl = infoEl.querySelector('[data-role="price-text"]');
    var vatEl = infoEl.querySelector('[data-role="price-vat"]');
    var availEl = infoEl.querySelector('[data-role="avail-text"]');
    var skuEl = infoEl.querySelector('[data-role="sku-text"]');
    var selLabelEl = infoEl.querySelector('[data-role="variant-selected"]');
    if (!opt) return;
    if (priceEl && !isNaN(opt.price)) priceEl.textContent = fmtKc(opt.price);
    if (vatEl && !isNaN(opt.price)) vatEl.textContent = fmtKc(opt.price / VAT) + ' bez DPH';
    if (availEl) {
      var ok = opt.inStock;
      availEl.textContent = opt.disabled ? 'Zvolte variantu' : (opt.availText || (ok ? 'Skladem' : 'Momentálně nedostupné'));
      availEl.classList.toggle('is-ok', ok && !opt.disabled);
      availEl.classList.toggle('is-out', !ok && !opt.disabled);
    }
    if (skuEl) skuEl.textContent = 'Kód: ' + (opt.codeid || defaultSku || '—');
    if (selLabelEl) selLabelEl.textContent = opt.disabled ? '' : opt.label;
  }

  function wireInfo(infoEl) {
    // přesun nativních ovládacích prvků do designu (form atribut udrží submit funkční)
    var formId = form.getAttribute('id');
    if (qtyBlock) {
      if (formId) {
        qtyBlock.querySelectorAll('input, button').forEach(function (el) { el.setAttribute('form', formId); });
      }
      infoEl.querySelector('.bt-slot-qty').replaceWith(qtyBlock);
    }
    if (submitBtn) {
      if (formId) submitBtn.setAttribute('form', formId);
      infoEl.querySelector('.bt-slot-submit').replaceWith(submitBtn);
      guardIcon(submitBtn);
    }

    var opts = parseOptions();
    if (select) {
      if (formId) select.setAttribute('form', formId);
      // select necháváme v DOMu (schovaný), jen skrz něj řídíme hodnotu pro odeslání
      select.style.position = 'absolute';
      select.style.opacity = '0';
      select.style.pointerEvents = 'none';
      select.style.width = '1px';
      select.style.height = '1px';
      infoEl.appendChild(select);

      infoEl.querySelectorAll('.variant-chip').forEach(function (chip) {
        var val = chip.getAttribute('data-value');
        var opt = opts.filter(function (o) { return o.value === val; })[0];
        if (opt && !opt.inStock) chip.classList.add('is-out');
        chip.addEventListener('click', function () {
          if (!opt) return;
          infoEl.querySelectorAll('.variant-chip').forEach(function (c) { c.classList.remove('selected'); });
          chip.classList.add('selected');
          select.value = val;
          triggerChange(select);
          updateFromOption(opt, infoEl);
          if (submitBtn) submitBtn.disabled = !!opt.disabled;
        });
      });
      // pokud je jen jedna reálná varianta, vybereme ji rovnou
      if (opts.length === 1) {
        var only = infoEl.querySelector('.variant-chip');
        if (only) only.click();
      }
    }

    var wishBtn = infoEl.querySelector('.btn-wishlist');
    if (wishBtn) wishBtn.addEventListener('click', function () { wishBtn.classList.toggle('active'); });
  }

  /* -----------------------------------------------------------
     Taby
     ----------------------------------------------------------- */
  function buildTabs() {
    var tabs = [];

    tabs.push({
      id: 'description',
      label: 'Popis',
      html: '<div class="p-description-grid"><div>' + (basicDescEl ? basicDescEl.innerHTML : '') + '</div>' +
        (specRows.length ? '<div><h3>Klíčové parametry</h3><div class="p-spec-table">' +
          specRows.map(function (r) {
            return '<div class="p-spec-row"><span class="key">' + esc(r[0]) + '</span><span class="val">' + esc(r[1]) + '</span></div>';
          }).join('') + '</div></div>' : '') +
      '</div>'
    });

    tabs.push({
      id: 'financing',
      label: 'Financování',
      html: '<div class="bt-info-tab"><p>Stroj si můžete pořídit i na splátky přes náš financovací program. Spočítáme vám individuální nabídku podle typu stroje a doby splácení.</p>' +
        '<a class="btn btn-ghost" href="/financovani/">Zjistit možnosti financování</a></div>'
    });

    tabs.push({
      id: 'service',
      label: 'Servis & doprava',
      html: '<div class="bt-info-tab"><p>O servis se staráme vlastními silami — od záručních oprav po pozáruční servis a dodávky náhradních dílů. Doprava probíhá po celé ČR.</p>' +
        '<a class="btn btn-ghost" href="/servis/">Více o servisu</a></div>'
    });

    if (discussionEl) {
      tabs.push({ id: 'reviews', label: 'Recenze', node: discussionEl });
    }

    return tabs;
  }

  function renderTabs(tabs) {
    var navHtml = tabs.map(function (t, i) {
      return '<li><button type="button" class="bt-tab-link' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + esc(t.label) + '</button></li>';
    }).join('');
    var paneHtml = tabs.map(function (t, i) {
      return '<div class="bt-tab-pane' + (i === 0 ? ' active' : '') + '" id="bt-tab-' + t.id + '">' + (t.node ? '' : (t.html || '')) + '</div>';
    }).join('');
    var wrap = document.createElement('div');
    wrap.className = 'p-tabs-wrap';
    wrap.innerHTML = '<ul class="bt-tabs">' + navHtml + '</ul><div class="bt-tab-content">' + paneHtml + '</div>';

    // uzly, co nejdou naklonovat (živý native discussion), přesuneme fyzicky
    tabs.forEach(function (t) {
      if (t.node) {
        var pane = wrap.querySelector('#bt-tab-' + t.id);
        pane.appendChild(t.node);
      }
    });

    wrap.querySelectorAll('.bt-tab-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        wrap.querySelectorAll('.bt-tab-link').forEach(function (b) { b.classList.remove('active'); });
        wrap.querySelectorAll('.bt-tab-pane').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        wrap.querySelector('#bt-tab-' + btn.getAttribute('data-tab')).classList.add('active');
      });
    });
    return wrap;
  }

  /* -----------------------------------------------------------
     Související stroje (načteme z kategorie produktu)
     ----------------------------------------------------------- */
  function buildRelated() {
    if (!lineHref) return;
    var section = document.createElement('section');
    section.className = 'related-section bt-scope-detail';
    section.innerHTML = '<div class="container"><div class="section-head"><div><span class="eyebrow">Související stroje</span><h2 style="margin-top:12px;font-size:36px;">Mohlo by se vám hodit</h2></div></div><div class="products"></div></div>';
    var grid = section.querySelector('.products');

    fetch(lineHref, { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        if (!html) { section.remove(); return; }
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var cards = Array.prototype.slice.call(doc.querySelectorAll('#products > .product')).filter(function (p) {
          var link = p.querySelector('.p a.name');
          if (!link || !link.getAttribute('href')) return false;
          var href = new URL(link.getAttribute('href'), location.href).pathname.replace(/\/$/, '');
          return href !== location.pathname.replace(/\/$/, '');
        }).slice(0, 4);
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
          guardIcon(addBtn);
          card.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            location.href = url;
          });
          grid.appendChild(card);
        });
      })
      .catch(function () { section.remove(); });

    return section;
  }

  /* -----------------------------------------------------------
     Init
     ----------------------------------------------------------- */
  function init() {
    if (document.getElementById('bt-detail-root')) return;
    var contentWrap = document.getElementById('content-wrapper');
    if (!contentWrap) return;

    var root = document.createElement('div');
    root.className = 'bt-scope-detail';
    root.id = 'bt-detail-root';
    root.innerHTML =
      '<div class="product-detail-wrap"><div class="container"><div class="p-detail-grid">' +
        '<div class="bt-gallery-slot"></div>' +
        '<div class="p-info"></div>' +
      '</div></div></div>';

    var gallerySlot = root.querySelector('.bt-gallery-slot');
    gallerySlot.outerHTML = buildGallery();
    root.querySelector('.p-info').innerHTML = buildInfo();

    var tabsWrap = renderTabs(buildTabs());
    root.querySelector('.container').appendChild(tabsWrap);

    contentWrap.parentNode.insertBefore(root, contentWrap.nextSibling);

    wireGallery(root);
    wireInfo(root.querySelector('.p-info'));

    var related = buildRelated();
    if (related) root.appendChild(related);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
