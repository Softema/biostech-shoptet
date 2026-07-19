# BiosTech — Shoptet override

Vlastní vzhled pro https://804384.myshoptet.com podle návrhu Bios TECH.

## Struktura
- `css/style.css` — bezpečná vrstva: barvy, fonty, tlačítka (v2)
- `css/components.css` — layouty z návrhu, platí jen uvnitř .bt-scope
- `css/header.css` — restyl hlavičky (zatím nenasazovat)
- `js/global.js` — globální JS
- `js/homepage.js` — vloží homepage sekce z návrhu
- `img/` — obrázky

## Shoptet — Editor vzhledu → HTML kód

Záhlaví (před </head>):

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/css/style.css?v=2">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/css/components.css?v=1">

Zápatí (před </body>):

    <script src="https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/js/global.js?v=1"></script>
    <script src="https://cdn.jsdelivr.net/gh/Softema/biostech-shoptet@main/js/homepage.js?v=1"></script>

Po každé změně souboru na GitHubu zvedni číslo ?v= v Shoptetu.
