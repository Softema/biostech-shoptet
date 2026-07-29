/* =============================================================
   BIOS TECH — pages.js
   Testovací jízda + Showroom Štoky — obě stránky byly v Shoptetu
   úplně prázdné (jen H1), takže tu nic nepřesouváme z nativního
   obsahu — stavíme novou stránku a napojujeme reálné formuláře
   na Formspree (rezervace@BiosTech tým dodal endpointy).
   ============================================================= */
(function () {
  'use strict';

  var CONFIG = {
    'testovaci-jizda': { build: buildTestDrive },
    'showroom-stoky': { build: buildShowroom }
  };

  var slug = null;
  for (var key in CONFIG) {
    if (document.body.classList.contains('in-' + key)) { slug = key; break; }
  }
  if (!slug) { if (window.__btDone) window.__btDone(); return; }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var ICONS = {
    calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 9h18M8 3v4M16 3v4"></path></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>'
  };

  /* -----------------------------------------------------------
     Formulář — sdílené pro obě stránky, liší se jen pole a endpoint
     ----------------------------------------------------------- */
  function buildForm(opts) {
    var fieldsHtml = opts.fields.map(function (f) {
      var full = f.full ? ' lp-field-full' : '';
      var input = f.type === 'textarea'
        ? '<textarea name="' + f.name + '" id="lpf-' + f.name + '"' + (f.required ? ' required' : '') + '></textarea>'
        : f.type === 'select'
          ? '<select name="' + f.name + '" id="lpf-' + f.name + '"' + (f.required ? ' required' : '') + '>' +
            f.options.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('') +
            '</select>'
          : '<input type="' + (f.type || 'text') + '" name="' + f.name + '" id="lpf-' + f.name + '"' + (f.required ? ' required' : '') + '>';
      return '<div class="lp-field' + full + '"><label for="lpf-' + f.name + '">' + esc(f.label) + (f.required ? ' *' : '') + '</label>' + input + '</div>';
    }).join('');

    return (
      '<div class="lp-form-wrap">' +
        '<h2>' + esc(opts.title) + '</h2>' +
        '<p>' + esc(opts.subtitle) + '</p>' +
        '<form class="lp-form" data-endpoint="' + esc(opts.endpoint) + '">' +
          '<input type="hidden" name="_subject" value="' + esc(opts.emailSubject) + '">' +
          '<div class="lp-form-grid">' + fieldsHtml + '</div>' +
          '<button type="submit" class="btn btn-lg">' + esc(opts.submitLabel) + ' ' + ICONS.arrow + '</button>' +
          '<div class="lp-form-status" role="status"></div>' +
        '</form>' +
        '<p class="lp-form-note">Ozveme se vám obvykle do 1 pracovního dne. Spěchá to? Zavolejte na <a href="tel:+420603123456">+420 603 123 456</a>.</p>' +
      '</div>'
    );
  }

  function wireForm(root) {
    var form = root.querySelector('.lp-form');
    if (!form) return;
    var status = form.querySelector('.lp-form-status');
    var btn = form.querySelector('button[type="submit"]');
    var btnDefaultText = btn.innerHTML;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = form.getAttribute('data-endpoint');
      var data = new FormData(form);
      btn.disabled = true;
      btn.textContent = 'Odesílám…';
      status.className = 'lp-form-status';
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            status.textContent = 'Díky! Ozveme se vám co nejdřív.';
            status.className = 'lp-form-status is-ok';
          } else {
            status.textContent = 'Něco se nepovedlo. Zkuste to prosím znovu, nebo napište na showroom@biostech.cz.';
            status.className = 'lp-form-status is-error';
          }
        })
        .catch(function () {
          status.textContent = 'Něco se nepovedlo. Zkuste to prosím znovu, nebo napište na showroom@biostech.cz.';
          status.className = 'lp-form-status is-error';
        })
        .then(function () {
          btn.disabled = false;
          btn.innerHTML = btnDefaultText;
        });
    });
  }

  /* -----------------------------------------------------------
     Testovací jízda
     ----------------------------------------------------------- */
  function buildTestDrive() {
    return (
      '<section class="lp-hero"><div class="container">' +
        '<span class="eyebrow eyebrow-light">Testovací jízda</span>' +
        '<h1>Vyzkoušejte stroj,<br>než si ho koupíte.</h1>' +
        '<p>90 minut, zdarma, ve showroomu Štoky. Vyberte si stroj a termín — o zbytek se postaráme my.</p>' +
      '</div></section>' +

      '<div class="container"><div class="lp-info-grid">' +
        '<div class="lp-info-card"><div class="lp-info-eyebrow">Délka jízdy</div><div class="lp-info-main">90 minut</div><div class="lp-info-sub">Po rezervaci · zdarma</div></div>' +
        '<div class="lp-info-card"><div class="lp-info-eyebrow">Místo</div><div class="lp-info-main">Štoky 184</div><div class="lp-info-sub">582 53 · 90 km od Prahy</div></div>' +
        '<div class="lp-info-card"><div class="lp-info-eyebrow">Cena</div><div class="lp-info-main">Zdarma</div><div class="lp-info-sub">Bez závazků</div></div>' +
      '</div></div>' +

      '<section class="lp-steps"><div class="container">' +
        '<div class="section-head"><span class="eyebrow">Jak to probíhá</span><h2>Tři kroky k jízdě.</h2></div>' +
        '<div class="lp-steps-grid">' +
          '<div class="lp-step"><div class="lp-step-num">1</div><h3>Vyberte stroj</h3><p>Projděte si <a href="/">nabídku</a> a vyberte, co chcete zkusit — od malotraktorů po ACE řadu.</p></div>' +
          '<div class="lp-step"><div class="lp-step-num">2</div><h3>Vyberte termín</h3><p>Vyplňte formulář níže s preferovaným dnem a časem. Potvrdíme vám ho e-mailem nebo telefonicky.</p></div>' +
          '<div class="lp-step"><div class="lp-step-num">3</div><h3>Přijeďte do Štok</h3><p>Posaďte se za páky a vyzkoušejte stroj naživo, ve stejném prostředí, kde ho budete používat.</p></div>' +
        '</div>' +
      '</div></section>' +

      '<section class="lp-form-section"><div class="container">' +
        buildForm({
          title: 'Rezervovat testovací jízdu',
          subtitle: 'Vyplňte formulář a domluvíme si termín, který vám vyhovuje.',
          endpoint: 'https://formspree.io/f/xvzewvkz',
          emailSubject: 'Rezervace testovací jízdy — BiosTech',
          submitLabel: 'Odeslat rezervaci',
          fields: [
            { name: 'name', label: 'Jméno a příjmení', required: true },
            { name: 'phone', label: 'Telefon', type: 'tel', required: true },
            { name: 'email', label: 'E-mail', type: 'email', required: true, full: true },
            { name: 'machine', label: 'O jaký stroj máte zájem', full: true },
            { name: 'date', label: 'Preferovaný termín', type: 'date' },
            { name: 'message', label: 'Poznámka', type: 'textarea', full: true }
          ]
        }) +
      '</div></section>'
    );
  }

  /* -----------------------------------------------------------
     Showroom Štoky
     ----------------------------------------------------------- */
  function buildShowroom() {
    return (
      '<section class="lp-hero"><div class="container">' +
        '<span class="eyebrow eyebrow-light">Showroom · Štoky</span>' +
        '<h1>Stroje si tu osaháte,<br>porovnáte vedle sebe, vyzkoušíte.</h1>' +
        '<p>Showroom — jako Mercedes nebo Apple. Ne prodejna. Ne katalog. Mluvíte s někým, kdo tomu rozumí.</p>' +
        '<div class="lp-hero-ctas">' +
          '<a class="btn btn-lg btn-pea" href="https://maps.google.com/?q=Štoky+184,+582+53" target="_blank" rel="noopener">' + ICONS.pin + ' Plán cesty</a>' +
          '<a class="btn btn-lg" style="background:transparent;border:1.5px solid rgba(255,255,255,0.3);color:#fff;" href="/testovaci-jizda/">' + ICONS.calendar + ' Testovací jízda</a>' +
        '</div>' +
      '</div></section>' +

      '<div class="container"><div class="lp-info-grid">' +
        '<div class="lp-info-card"><div class="lp-info-eyebrow">Adresa</div><div class="lp-info-main">Štoky 184</div><div class="lp-info-sub">582 53 · D1, 90 km od Prahy</div></div>' +
        '<div class="lp-info-card"><div class="lp-info-eyebrow">Otevírací doba</div><div class="lp-info-main">Po–Pá 8–17</div><div class="lp-info-sub">So 9–13 · Ne zavřeno</div></div>' +
        '<div class="lp-info-card"><div class="lp-info-eyebrow">Kontakt</div><div class="lp-info-main"><a href="tel:+420603123456" style="color:inherit;">+420 603 123 456</a></div><div class="lp-info-sub"><a href="mailto:showroom@biostech.cz" style="color:inherit;">showroom@biostech.cz</a></div></div>' +
      '</div></div>' +

      '<section class="lp-steps"><div class="container">' +
        '<div class="section-head"><span class="eyebrow">Co tu najdete</span><h2>15+ strojů, 3 produktové linie.</h2></div>' +
        '<div class="lp-steps-grid">' +
          '<div class="lp-step"><div class="lp-step-num">' + ICONS.pin + '</div><h3>Vše na jednom místě</h3><p>Rhinoceros, M3 i ACE vedle sebe — porovnáte je naživo, ne jen na fotkách.</p></div>' +
          '<div class="lp-step"><div class="lp-step-num">' + ICONS.calendar + '</div><h3>Testovací jízdy</h3><p>Ke každému stroji si můžete rezervovat 90minutovou jízdu zdarma.</p></div>' +
          '<div class="lp-step"><div class="lp-step-num">' + ICONS.arrow + '</div><h3>Odborné poradenství</h3><p>Showroom Štoky je oficiální centrála značky ACE pro ČR — poradíme s výběrem i servisem.</p></div>' +
        '</div>' +
      '</div></section>' +

      '<section class="lp-form-section"><div class="container">' +
        buildForm({
          title: 'Domluvit si návštěvu',
          subtitle: 'Dejte nám vědět, kdy se u nás zastavíte, ať se vám budeme moct plně věnovat.',
          endpoint: 'https://formspree.io/f/xrenyopq',
          emailSubject: 'Rezervace showroomu — BiosTech',
          submitLabel: 'Odeslat poptávku',
          fields: [
            { name: 'name', label: 'Jméno a příjmení', required: true },
            { name: 'phone', label: 'Telefon', type: 'tel', required: true },
            { name: 'email', label: 'E-mail', type: 'email', required: true, full: true },
            { name: 'date', label: 'Preferovaný termín', type: 'date' },
            { name: 'people', label: 'Počet osob', type: 'number' },
            { name: 'message', label: 'Poznámka', type: 'textarea', full: true }
          ]
        }) +
      '</div></section>'
    );
  }

  function init() {
    var article = document.querySelector('article.pageArticleDetail [itemprop="about"]');
    if (!article) { if (window.__btDone) window.__btDone(); return; }

    // schováme prázdnou diskuzi (0 příspěvků, na landing stránce nedává smysl)
    var discussionHeading = Array.prototype.slice.call(document.querySelectorAll('.content-inner > h2'))
      .filter(function (h) { return /diskuze/i.test(h.textContent); });
    discussionHeading.forEach(function (h) { h.classList.add('bt-hide-discussion'); });

    var root = document.createElement('div');
    root.className = 'bt-scope bt-scope-page';
    root.innerHTML = CONFIG[slug].build();
    article.parentNode.insertBefore(root, article.nextSibling);

    wireForm(root);
    if (window.__btDone) window.__btDone();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
