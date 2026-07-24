/* =============================================================
   BIOS TECH — homepage.js
   Vloží na homepage sekce z návrhu (hero, linie, produkty, ACE,
   showroom) a schová výchozí obsah šablony Shoptetu.
   ============================================================= */
(function () {
  'use strict';

  // Spustit jen na homepage
  var isHome = location.pathname === '/' || location.pathname === '' ||
               document.body.classList.contains('in-index') ||
               document.body.classList.contains('type-index');
  if (!isHome) { if (window.__btDone) window.__btDone(); return; }

  var MARKUP = "<section class=\"hero-split section-dark\" style=\"background: linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.35) 100%), linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.0) 35%, rgba(10,10,10,0.55) 100%), url(&#39;hero-sky-bg.png&#39;) center/cover no-repeat, var(--bt-black); color: var(--bt-white); padding: 0px; position: relative; overflow: hidden;\"><div class=\"container\" style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; padding: 80px 32px; min-height: 580px;\"><div><span class=\"eyebrow eyebrow-light\">Showroom · Štoky</span><h1 style=\"font-size: clamp(48px, 6vw, 88px); line-height: 0.95; letter-spacing: -0.03em; margin-top: 24px; font-weight: 800;\">Technika<br>pro vaši <span style=\"color: var(--bt-pea);\">práci</span>.</h1><p style=\"font-size: 18px; color: var(--bt-chrome); max-width: 480px; margin-top: 24px; line-height: 1.55;\">Vyberte. Porovnejte. Vyzkoušejte. Showroom nové generace traktorů a techniky pro ty, kteří chtějí víc než jen stroj.</p><div style=\"display: flex; gap: 12px; margin-top: 36px; flex-wrap: wrap;\"><button class=\"btn btn-lg btn-pea\">Prohlédnout stroje <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"></path></svg></button><button class=\"btn btn-lg\" style=\"background: transparent; border: 1.5px solid rgba(255, 255, 255, 0.3); color: white;\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"></rect><path d=\"M3 9h18M8 3v4M16 3v4\"></path></svg> Rezervovat testovací jízdu</button></div><div style=\"display: flex; gap: 32px; margin-top: 56px; color: var(--bt-chrome); font-size: 13px;\"><div><div style=\"font-size: 28px; font-weight: 800; color: white;\">15+</div>strojů ve showroomu</div><div><div style=\"font-size: 28px; font-weight: 800; color: white;\">3</div>produktové linie</div><div><div style=\"font-size: 28px; font-weight: 800; color: white;\">7 let</div>záruka ACE</div></div></div><div style=\"position: relative; height: 480px; display: flex; align-items: center; justify-content: center;\"><div style=\"position: absolute; inset: 0px; background: radial-gradient(rgba(139, 197, 63, 0.18) 0%, transparent 60%);\"></div><div style=\"position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 360px; height: 360px; border-radius: 50%; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08);\"></div><div style=\"width: 100%; height: 70%; position: relative; z-index: 1;\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div><div style=\"position: absolute; right: 20px; top: 30px; padding: 12px 16px; background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 12px; color: var(--bt-chrome);\"><div style=\"font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--bt-pea);\">Vlajková loď</div><div style=\"color: white; font-weight: 700; font-size: 14px; margin-top: 2px;\">ACE V3000</div><div style=\"font-size: 11px; margin-top: 2px;\">50 HP · 4×4 Pro</div></div><div style=\"position: absolute; left: 0px; bottom: 60px; padding: 10px 14px; background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 11px; color: var(--bt-chrome); display: flex; align-items: center; gap: 8px;\"><span style=\"width: 6px; height: 6px; border-radius: 50%; background: var(--bt-pea);\"></span>Vyzkoušejte ve showroomu Štoky</div></div></div></section><div class=\"container\" style=\"margin-top: 24px;\"><div class=\"bt-benefits\"><div class=\"bt-benefits__item\"><div class=\"bt-benefits__picture\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 7h12v9H3zM15 11h4l2 3v2h-6\"></path><circle cx=\"7\" cy=\"18\" r=\"1.6\"></circle><circle cx=\"18\" cy=\"18\" r=\"1.6\"></circle></svg></div><div class=\"bt-benefits__content\"><strong class=\"bt-benefits__title\">Doprava stroje k vám</strong><div class=\"bt-benefits__data\">Celá ČR i Slovensko</div></div></div><div class=\"bt-benefits__item\"><div class=\"bt-benefits__picture\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6Z\"></path><path d=\"m9 12 2 2 4-4\"></path></svg></div><div class=\"bt-benefits__content\"><strong class=\"bt-benefits__title\">Záruka až 7 let</strong><div class=\"bt-benefits__data\">Na ACE řadu</div></div></div><div class=\"bt-benefits__item\"><div class=\"bt-benefits__picture\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.5 2.5-2.8-2.8 2.3-2.7Z\"></path></svg></div><div class=\"bt-benefits__content\"><strong class=\"bt-benefits__title\">Vlastní servis</strong><div class=\"bt-benefits__data\">Záruční i pozáruční</div></div></div><div class=\"bt-benefits__item\"><div class=\"bt-benefits__picture\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle></svg></div><div class=\"bt-benefits__content\"><strong class=\"bt-benefits__title\">Showroom Štoky</strong><div class=\"bt-benefits__data\">Vyzkoušejte před nákupem</div></div></div></div></div><section class=\"section\"><div class=\"container\"><div class=\"section-head\"><div><span class=\"eyebrow\">Tři linie · Tři světy</span><h2 style=\"margin-top: 16px;\">Vyberte si svět práce.</h2></div><div class=\"section-head-meta\"><span>Hobby · Hobby/Profi · ACE Profi</span></div></div><div class=\"line-grid\"><a class=\"line-card line-hobby\" href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\"><div><span class=\"line-num\">01 · Hobby</span><h3>Rhinoceros</h3><p>Pro zahrady, sady a menší pozemky. Cesta začíná tady — bez kompromisů na kvalitě.</p></div><span class=\"line-arrow\">→</span><div class=\"line-deco\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div></a><a class=\"line-card line-profi\" href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\"><div><span class=\"line-num\">02 · Hobby/Profi</span><h3>M3</h3><p>Pro farmy, vinaře, sadaře a obce. Sílu i citlivost spojuje do jedné jízdy.</p></div><span class=\"line-arrow\">→</span><div class=\"line-deco\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div></a><a class=\"line-card line-ace\" href=\"file:///C:/Users/honzo/OneDrive/Plocha/Biostech%20na%20novo/Bios%20TECH%20e-shop.html#\"><div><span class=\"line-num\" style=\"color: var(--ace-orange);\">03 · Profi ACE</span><h3>ACE</h3><p>Vlajková řada bez kompromisů. Centrála ACE pro ČR ve Štokách.</p></div><span class=\"line-arrow\">→</span><div class=\"line-deco\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div></a></div></div></section><section class=\"section-tight section-paper\"><div class=\"container\"><div class=\"section-head\"><div><span class=\"eyebrow\">Top produkty</span><h2 style=\"margin-top: 16px;\">Nové stroje.<br>Nová generace.</h2></div></div><div class=\"products bt-top-products\"></div></div></section><section style=\"background: var(--bt-black); color: white; padding: 80px 0px; position: relative; overflow: hidden;\"><div class=\"container\"><div style=\"display: grid; grid-template-columns: 1fr 1.6fr; gap: 56px; align-items: center; margin-bottom: 48px;\"><div><div style=\"display: inline-flex; align-items: center; gap: 10px; padding: 6px 14px; border-radius: 100px; background: rgba(255, 106, 31, 0.12); border: 1px solid rgba(255, 106, 31, 0.3); font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ace-orange);\"><span style=\"width: 6px; height: 6px; border-radius: 50%; background: var(--ace-orange);\"></span>Sub-brand · Centrála ČR</div><h2 style=\"font-size: 64px; margin-top: 24px; color: white; line-height: 0.95; letter-spacing: -0.03em;\"><span style=\"color: var(--ace-orange);\">ACE</span>.<br>Profesionální traktory.</h2><p style=\"color: var(--bt-chrome); font-size: 17px; margin-top: 20px; max-width: 420px;\">Pro toho, kdo nebere kompromisy. Showroom Štoky je oficiální centrála značky ACE pro Českou republiku — s vlastní obrandovanou zónou.</p><button class=\"btn btn-lg\" style=\"background: var(--ace-orange); color: white; margin-top: 32px;\">ACE řada <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"></path></svg></button></div><div style=\"background: linear-gradient(135deg, rgb(31, 35, 41) 0%, rgb(14, 16, 20) 100%); border: 1px solid rgba(255, 106, 31, 0.15); border-radius: 24px; padding: 40px; position: relative; overflow: hidden; min-height: 380px; display: flex; align-items: center;\"><div style=\"width: 100%; height: 320px;\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div><div style=\"position: absolute; left: 32px; top: 32px; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ace-orange);\">Vlajková loď</div><div style=\"position: absolute; left: 32px; bottom: 32px; color: white;\"><div style=\"font-size: 28px; font-weight: 800; letter-spacing: -0.02em;\">ACE V3000</div><div style=\"font-size: 14px; color: var(--bt-chrome); margin-top: 4px;\">50 HP · 4×4 Pro · S nakladačem</div></div><div style=\"position: absolute; right: 32px; bottom: 32px; text-align: right; color: white;\"><div style=\"font-size: 11px; color: var(--bt-chrome); letter-spacing: 0.1em; text-transform: uppercase;\">Od</div><div style=\"font-size: 28px; font-weight: 800;\">1 290 000 Kč</div></div></div></div><div class=\"products cols-3\" style=\"grid-template-columns: repeat(3, 1fr);\"><article class=\"product-card variant-dark\" style=\"cursor: pointer;\"><div class=\"product-image\"><span class=\"product-line pl-ace\">Profi ACE</span><div class=\"product-flags\"><span class=\"flag\">Vlajková loď</span><span class=\"flag\">Testovací jízda</span></div><div class=\"placeholder-machine\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div></div><div class=\"product-body\"><div class=\"product-brand\">ACE · ACE-V3000</div><h3 class=\"product-name\">ACE V3000</h3><div class=\"product-specs\"><span class=\"spec\">Výkon: <strong>50 HP</strong></span><span class=\"spec\">Pohon: <strong>4×4 Pro</strong></span><span class=\"spec\">Hmotnost: <strong>2 100 kg</strong></span></div><div class=\"product-foot\"><div><span class=\"availability-label\">Skladem</span><div class=\"price-final\">1&nbsp;290&nbsp;000 Kč</div><span class=\"price-additional\">1&nbsp;066&nbsp;116 Kč bez DPH</span></div><button class=\"add-btn\" aria-label=\"Přidat ACE V3000 do košíku\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"></path></svg></button></div></div></article><article class=\"product-card variant-dark\" style=\"cursor: pointer;\"><div class=\"product-image\"><span class=\"product-line pl-ace\">Profi ACE</span><div class=\"product-flags\"><span class=\"flag\">Na objednávku</span></div><div class=\"placeholder-machine\"><img src=\"https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/img/proto-a25c6c4e.webp\" alt=\"ACE Veer 3000\" loading=\"lazy\" draggable=\"false\" style=\"width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block; pointer-events: none;\"></div></div><div class=\"product-body\"><div class=\"product-brand\">ACE · ACE-V5000</div><h3 class=\"product-name\">ACE V5000 Pro</h3><div class=\"product-specs\"><span class=\"spec\">Výkon: <strong>75 HP</strong></span><span class=\"spec\">Pohon: <strong>4×4 Pro</strong></span><span class=\"spec\">Hmotnost: <strong>2 850 kg</strong></span></div><div class=\"product-foot\"><div><span class=\"availability-label\">Na objednávku</span><div class=\"price-final\">1&nbsp;890&nbsp;000 Kč</div><span class=\"price-additional\">1&nbsp;561&nbsp;983 Kč bez DPH</span></div><button class=\"add-btn\" aria-label=\"Přidat ACE V5000 Pro do košíku\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"></path></svg></button></div></div></article><div class=\"product-card variant-dark\" style=\"display: flex; flex-direction: column; justify-content: space-between; padding: 24px; background: linear-gradient(rgb(45, 49, 56) 0%, rgb(26, 26, 26) 100%); border: 1px solid rgba(255, 106, 31, 0.2);\"><div><div style=\"font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ace-orange);\">Testovací jízda</div><h3 style=\"font-size: 28px; color: white; margin-top: 12px; letter-spacing: -0.02em;\">Vyzkoušejte stroj, než si ho koupíte.</h3><p style=\"color: var(--bt-chrome); font-size: 14px; margin-top: 12px;\">Zóna pro testovací jízdy ve Štokách. Rezervujte si 90 minut.</p></div><button class=\"btn\" style=\"background: var(--ace-orange); color: white; margin-top: 24px; align-self: flex-start;\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"></rect><path d=\"M3 9h18M8 3v4M16 3v4\"></path></svg> Rezervovat</button></div></div></div></section><section class=\"section\"><div class=\"container\"><div style=\"background: var(--bt-paper); border-radius: var(--radius-xl); padding: 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden;\"><div><span class=\"eyebrow\">Showroom · Štoky</span><h2 style=\"font-size: clamp(36px, 5vw, 64px); margin-top: 16px; letter-spacing: -0.025em;\">Stroje si tu osaháte,<br>porovnáte vedle sebe,<br>vyzkoušíte.</h2><p style=\"color: rgb(58, 63, 71); font-size: 16px; margin-top: 16px; max-width: 460px;\">Showroom — jako Mercedes nebo Apple. Ne prodejna. Ne katalog. Mluvíte s někým, kdo tomu rozumí.</p><div style=\"display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap;\"><button class=\"btn btn-lg\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle></svg> Plán cesty</button><button class=\"btn btn-lg btn-ghost\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"></rect><path d=\"M3 9h18M8 3v4M16 3v4\"></path></svg> Testovací jízda</button></div></div><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-self: stretch;\"><div style=\"background: var(--bt-black); color: white; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; grid-column: 1 / 3; min-height: 200px; position: relative; overflow: hidden;\"><div style=\"font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bt-chrome);\">Adresa</div><div><div style=\"font-size: 24px; font-weight: 800; letter-spacing: -0.01em; color: white;\">Štoky 184</div><div style=\"font-size: 13px; color: var(--bt-chrome); margin-top: 2px;\">582 53 · D1 výjezd 90 km od Prahy</div></div><div style=\"position: absolute; right: 24px; top: 24px;\"><svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color: var(--bt-pea);\"><path d=\"M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle></svg></div></div><div style=\"background: white; border: 1px solid var(--bt-line); border-radius: 16px; padding: 20px;\"><div style=\"font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgb(107, 111, 117);\">Po–Pá</div><div style=\"font-size: 20px; font-weight: 800; margin-top: 4px;\">8:00 – 17:00</div><div style=\"font-size: 12px; color: rgb(107, 111, 117); margin-top: 8px;\">So 9–13 · Ne zavřeno</div></div><div style=\"background: white; border: 1px solid var(--bt-line); border-radius: 16px; padding: 20px;\"><div style=\"font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgb(107, 111, 117);\">Testovací jízda</div><div style=\"font-size: 20px; font-weight: 800; margin-top: 4px;\">90 min</div><div style=\"font-size: 12px; color: rgb(107, 111, 117); margin-top: 8px;\">Po rezervaci · zdarma</div></div></div></div></div></section><section style=\"padding: 80px 0px; background: var(--bt-paper-warm);\"><div class=\"container\"><div style=\"max-width: 780px; margin: 0px auto; text-align: center;\"><span class=\"eyebrow\" style=\"justify-content: center;\">Co děláme</span><p style=\"font-size: clamp(28px, 3.6vw, 44px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.18; margin-top: 24px; color: var(--bt-black); text-wrap: balance;\">Neprodáváme jen stroje. Pomáháme lidem vybrat techniku pro jejich práci, kterou si chtějí <span style=\"color: var(--bt-pea-deep);\">prožít</span>, ne jen odbýt.</p><div style=\"display: flex; justify-content: center; gap: 48px; margin-top: 48px; flex-wrap: wrap; font-size: 13px; color: rgb(107, 111, 117);\"><div><strong style=\"color: var(--bt-black); display: block; font-size: 16px;\">Tvoříme prostor</strong>pro vaši vizi</div><div><strong style=\"color: var(--bt-black); display: block; font-size: 16px;\">Síla a odvaha</strong>ne strach</div><div><strong style=\"color: var(--bt-black); display: block; font-size: 16px;\">Otevřenost</strong>nasloucháme, reagujeme</div><div><strong style=\"color: var(--bt-black); display: block; font-size: 16px;\">Trvalost</strong>jsme s vámi i v dalších letech</div></div></div></div></section></div>";


  var BT_LINKS = {
    'Prohlédnout stroje': '/rhinoceros-hobby/',
    'Všechny stroje': '/rhinoceros-hobby/',
    'Rezervovat testovací jízdu': '/testovaci-jizda/',
    'Rezervovat': '/testovaci-jizda/',
    'ACE řada': '/ace-profi/',
    'Plán cesty': '/showroom-stoky/',
    'Testovací jízda': '/testovaci-jizda/'
  };
  var BT_CARD_LINKS = {
    'line-hobby': '/rhinoceros-hobby/',
    'line-profi': '/m3-hobby-profi/',
    'line-ace': '/ace-profi/'
  };

  var VAT = 1.21;
  var PLUS_SVG = '<svg class="bt-plus-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';
  // stejné barvy/štítky linie jako na kategoriích — odvozeno ze skutečné
  // kategorie produktu (viz fetchLineAndSpecs), ne z toho, na které záložce
  // v adminu produkt je
  var LINE_BADGE = {
    'rhinoceros-hobby': { label: 'Hobby', cls: 'pl-hobby' },
    'm3-hobby-profi': { label: 'Hobby/Profi', cls: 'pl-profi' },
    'ace-profi': { label: 'Profi ACE', cls: 'pl-ace' },
    'minibagry': { label: 'Minibagry', cls: '' },
    'nakladace': { label: 'Nakladače', cls: '' },
    'prislusenstvi': { label: 'Příslušenství', cls: '' },
    'malotraktory': { label: 'Malotraktory', cls: '' },
    'nove-malotraktory': { label: 'Nové malotraktory', cls: 'pl-hobby' }
  };
  var SPEC_KEY_ORDER = [
    { label: 'Výkon', match: ['vykon'] },
    { label: 'Pohon', match: ['pohon', 'nahon'] },
    { label: 'Hmotnost', match: ['hmotnost'] }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function fmtKc(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + '\u00A0Kč';
  }
  function normKey(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function ensureIcon(el, svg) {
    if (!el) return;
    el.querySelectorAll('svg:not(.bt-plus-icon), i, .icon').forEach(function (n) { n.remove(); });
    if (!el.querySelector('svg.bt-plus-icon')) el.insertAdjacentHTML('beforeend', svg);
  }

  /* Nativní widget "TOP PRODUKTY" (Administrace → Produkty na titulní
     straně) — najdeme ho podle nadpisu, ne podle čísla skupiny (to by se
     mohlo změnit, kdyby si někdo přeuspořádal záložky v adminu). */
  function findTopProductsGroup() {
    var headings = document.querySelectorAll('.homepage-group-title');
    for (var i = 0; i < headings.length; i++) {
      if (/top produkty/i.test(txt(headings[i]))) {
        var sib = headings[i].nextElementSibling;
        while (sib && !sib.classList.contains('products')) sib = sib.nextElementSibling;
        return sib;
      }
    }
    return null;
  }

  function buildProductCard(p) {
    var linkEl = p.querySelector('a.name');
    var nameEl = p.querySelector('a.name [data-micro="name"]') || linkEl;
    var imgEl = p.querySelector('a.image img');
    var offerEl = p.querySelector('[data-micro="offer"]');
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
    var priceNum = offerEl ? Math.round(parseFloat(offerEl.getAttribute('data-micro-price') || 'NaN')) : NaN;

    var flags = [];
    p.querySelectorAll('.flags .flag, .extra-flags .flag, .flag-default, .flag-action').forEach(function (f) {
      var t = txt(f); if (t) flags.push(t);
    });
    var flagsHtml = flags.length
      ? '<div class="product-flags">' + flags.map(function (f) { return '<span class="flag">' + esc(f) + '</span>'; }).join('') + '</div>'
      : '';
    var bezDph = (!isNaN(priceNum) && priceNum > 0)
      ? '<span class="price-additional">' + fmtKc(priceNum / VAT) + ' bez DPH</span>'
      : '';
    var availHtml = '<span class="availability-label' + (inStock ? '' : ' is-out') + '">' +
      esc(availText || (inStock ? 'Skladem' : 'Nedostupné')) + '</span>';

    var card = document.createElement('article');
    card.className = 'product-card';
    card.style.cursor = 'pointer';
    card.innerHTML =
      '<div class="product-image">' +
        '<span class="product-line bt-line-slot"></span>' +
        flagsHtml +
        '<a href="' + esc(url) + '" tabindex="-1" aria-hidden="true" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">' +
          (imgSrc ? '<img src="' + esc(imgSrc) + '" alt="' + esc(name) + '" loading="lazy" style="width:100%;height:100%;object-fit:contain;object-position:center bottom;">' : '') +
        '</a>' +
      '</div>' +
      '<div class="product-body">' +
        '<div class="product-brand">BIOS TECH' + (sku ? ' · ' + esc(sku) : '') + '</div>' +
        '<h3 class="product-name"><a href="' + esc(url) + '" style="color:inherit;text-decoration:none;">' + esc(name) + '</a></h3>' +
        '<div class="product-specs bt-specs-slot"></div>' +
        '<div class="product-foot">' +
          '<div>' + availHtml + '<div class="price-final">' + (isNaN(priceNum) ? '' : fmtKc(priceNum)) + '</div>' + bezDph + '</div>' +
          '<span class="bt-cart-slot"></span>' +
        '</div>' +
      '</div>';

    var cartSlot = card.querySelector('.bt-cart-slot');
    if (formEl) {
      cartSlot.parentNode.replaceChild(formEl, cartSlot);
      ensureIcon(formEl.querySelector('.add-to-cart-button'), PLUS_SVG);
    } else {
      var fallback = document.createElement('a');
      fallback.className = 'add-btn';
      fallback.setAttribute('href', url);
      fallback.setAttribute('aria-label', 'Zobrazit ' + name);
      cartSlot.parentNode.replaceChild(fallback, cartSlot);
      ensureIcon(fallback, PLUS_SVG);
    }
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button, form, input')) return;
      location.href = url;
    });
    return { card: card, url: url };
  }

  /* Doplní barevný štítek linie a specifikační chipy (Výkon/Pohon/Hmotnost)
     — obojí se čte ze SKUTEČNÉ stránky produktu (drobečková navigace pro
     linii, tabulka parametrů pro specifikace), stejně jako na detailu. */
  function fetchLineAndSpecs(url, card) {
    fetch(url, { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        if (!html) return;
        var doc = new DOMParser().parseFromString(html, 'text/html');

        var crumbs = doc.querySelectorAll('.breadcrumbs-wrapper .breadcrumbs > span[itemprop="itemListElement"]');
        if (crumbs.length > 1) {
          var catA = crumbs[crumbs.length - 2].querySelector('a');
          if (catA) {
            var slugMatch = catA.getAttribute('href').match(/\/([^\/]+)\/?$/);
            var slug = slugMatch ? slugMatch[1] : '';
            var badge = LINE_BADGE[slug];
            if (badge && badge.label) {
              var lineSlot = card.querySelector('.bt-line-slot');
              if (lineSlot) { lineSlot.textContent = badge.label; if (badge.cls) lineSlot.classList.add(badge.cls); }
            }
          }
        }

        var rows = doc.querySelectorAll('#description .extended-description table.detail-parameters tr');
        var found = {};
        rows.forEach(function (row) {
          var key = txt(row.querySelector('th'));
          var val = txt(row.querySelector('td'));
          if (!key || !val) return;
          var nk = normKey(key);
          SPEC_KEY_ORDER.forEach(function (spec) {
            if (!found[spec.label] && spec.match.some(function (m) { return nk.indexOf(m) !== -1; })) {
              found[spec.label] = val;
            }
          });
        });
        var specsHtml = SPEC_KEY_ORDER
          .filter(function (spec) { return found[spec.label]; })
          .map(function (spec) { return '<span class="spec">' + esc(spec.label) + ': <strong>' + esc(found[spec.label]) + '</strong></span>'; })
          .join('');
        var specsSlot = card.querySelector('.bt-specs-slot');
        if (specsSlot) specsSlot.innerHTML = specsHtml;
      })
      .catch(function () { /* linie/specifikace zůstanou prázdné, karta jinak funguje */ });
  }

  function buildTopProducts(wrap, nativeProducts) {
    var host = wrap.querySelector('.bt-top-products');
    if (!host || !nativeProducts.length) { if (host) host.closest('section').remove(); return; }
    nativeProducts.forEach(function (p) {
      var built = buildProductCard(p);
      host.appendChild(built.card);
      fetchLineAndSpecs(built.url, built.card);
    });
  }

  function wireLinks(root) {

    root.querySelectorAll('a, button').forEach(function (el) {
      var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      // karty linií podle třídy
      for (var cls in BT_CARD_LINKS) {
        if (el.classList && el.classList.contains(cls)) {
          el.setAttribute('href', BT_CARD_LINKS[cls]);
          return;
        }
      }
      if (BT_LINKS[text]) {
        if (el.tagName === 'A') {
          el.setAttribute('href', BT_LINKS[text]);
        } else {
          el.style.cursor = 'pointer';
          el.addEventListener('click', function () { location.href = BT_LINKS[text]; });
        }
      }
    });
  }

  function inject() {
    // MUSÍME zachránit nativní produkty PŘED host.innerHTML = '' níže,
    // jinak je ten příkaz nenávratně smaže dřív, než z nich stihneme
    // vytáhnout data
    var nativeGroup = findTopProductsGroup();
    var nativeProducts = [];
    if (nativeGroup) {
      nativeProducts = Array.prototype.slice.call(nativeGroup.children).filter(function (el) {
        return el.classList.contains('product');
      });
      nativeProducts.forEach(function (p) { p.remove(); });
      nativeGroup.style.display = 'none'; // prázdný box po sobě nenecháme viditelný
    }

    var host = document.getElementById('content-wrapper') ||
               document.querySelector('.content-wrapper') ||
               document.querySelector('main') ||
               document.getElementById('content');

    var wrap = document.createElement('div');
    wrap.className = 'bt-scope';
    wrap.id = 'bt-homepage';
    wrap.innerHTML = MARKUP;

    if (host) {
      host.innerHTML = '';
      host.appendChild(wrap);
    } else {
      var header = document.getElementById('header');
      if (header && header.parentNode) {
        header.parentNode.insertBefore(wrap, header.nextSibling);
      } else {
        document.body.insertBefore(wrap, document.body.firstChild);
      }
    }

    // Schovat zbytky výchozí šablony na homepage
    var style = document.createElement('style');
    style.textContent = [
      'body > *:not(#bt-homepage) .benefitBanner { display: none !important; }',
      '#carousel, .homepage-box, .homepage-group-title { display: none !important; }',
      '.content-wrapper.container:not(#content-wrapper) { display: none !important; }',
      '#bt-homepage { display: block; }'
    ].join('\n');
    document.head.appendChild(style);
    wireLinks(wrap);
    buildTopProducts(wrap, nativeProducts);
    if (window.__btDone) window.__btDone();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
