# BiosTech — Shoptet override

Vlastní vzhled pro https://804384.myshoptet.com podle návrhu Bios TECH.

## Struktura
- `css/style.css` — hlavní override šablony (barvy, fonty, karty produktů…)
- `js/global.js` — vlastní JavaScript (hlavička, homepage sekce…)
- `img/` — obrázky pro hero a pozadí

## Vložení do Shoptetu (Editor vzhledu → HTML kód)

Záhlaví (před </head>):

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/UZIVATEL/biostech-shoptet@main/css/style.css?v=1">

Zápatí (před </body>):

    <script src="https://cdn.jsdelivr.net/gh/UZIVATEL/biostech-shoptet@main/js/global.js?v=1"></script>

Po každé změně souboru na GitHubu zvedni číslo `?v=` v Shoptetu.
