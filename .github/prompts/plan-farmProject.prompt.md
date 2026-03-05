Dziękuję za wyjaśnienia! Kilka kluczowych ustaleń:
- Białe tło `.farm` zostaje (to intencjonalne działanie, nie bug)  
- Produkty będą mieć wspólny komponent bazowy, ale różne nazwy klas dla rozróżnienia
- Wszystkie inline style przenosimy do [style.css](style.css)
- Dodajemy konkretną czcionkę (proponuję w planie)

Co do **rem vs em**: dla głównego projektu polecam **rem** jako standard - jest przewidywalny, ułatwia skalowanie i jest zgodny z najnowszymi praktykami. **em** można używać tylko dla względnych odstępów wewnątrz komponentów (np. padding w buttonach).

Teraz stworzę szczegółowy plan z optymalną kolejnością działań:

---

## Plan: Refaktoryzacja farm-project do nowoczesnych standardów

**TL;DR**: Kompleksowa refaktoryzacja 9 plików HTML i głównego arkusza stylów, wprowadzająca system CSS custom properties, konsolidację ~287 linii inline CSS, pełne nazewnictwo BEM, oraz uporządkowanie komponentów produktowych. Kolejność zaprojektowana by minimalizować przepisywanie - najpierw fundament (zmienne CSS), potem struktura (inline→external), nazewnictwo (BEM), i na końcu komponenty (menu, produkty, .farm). Użytkownik chce dodać czcionkę i przejść na rem jako jednostkę podstawową.

**Kluczowe decyzje**:
- Białe tło `.farm` (linia 189) zachowujemy - to intencjonalne działanie
- rem jako główna jednostka, em tylko dla względnych odstępów wewnątrz komponentów
- Wspólny komponent bazowy dla produktów, ale osobne nazwy klas dla [index.html](index.html) i [produkty.html](produkty.html)
- Całkowite przeniesienie inline CSS do [style.css](style.css)

---

### **Kroki wykonania**

#### **Krok 1: Fundament - System CSS Custom Properties**
*Kolejność: Pierwszy, bo wszystkie późniejsze kroki będą wykorzystywać te zmienne*

1.1. Dodaj sekcję `:root` na początku [style.css](style.css) z:
   - **Font system**: 
     - `--font-primary` (np. 'Inter', 'System UI' lub 'Open Sans' - proponuję zapytać o preferencję lub wybrać Inter jako nowoczesną, uniwersalną opcję)
     - `--font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
   - **Rozmiary typografii** (rem, bazując na obecnych `clamp()` wartościach):
     - `--text-xs: clamp(0.625rem, 1vw, 0.875rem)` (obecnie h6: 9px-14px)
     - `--text-sm: clamp(0.625rem, 1.2vw, 1.125rem)` (ujednolicenie małych textów: 10px-18px)
     - `--text-base: clamp(0.6875rem, 2vw, 1.25rem)` (menu + większe teksty: 11px-20px)
     - `--text-md: clamp(0.75rem, 1.8vw, 1.25rem)` (h4: 12px-20px)
     - `--text-lg: clamp(0.875rem, 2.2vw, 1.75rem)` (h2: 14px-28px)
     - `--text-xl: clamp(1rem, 2.6vw, 1.875rem)` (h3: 16px-30px)
     - `--text-2xl: clamp(1.375rem, 4vw, 9.25rem)` (h1: 22px-148px)
   - **Spacing scale** (rem):
     - `--space-xs: 0.5rem`, `--space-sm: 1rem`, `--space-md: 1.5rem`, `--space-lg: 2.5rem`, `--space-xl: 4rem`
   - **Kolory** (wyciągnięte z obecnych deklaracji):
     - `--color-text: #000000`
     - `--color-bg: #ffffff`
     - `--color-text-inverse: #ffffff` (dla białego tekstu)
     - `--color-bg-inverse: #000000` (dla czarnego tła)

1.2. Zastąp wszystkie 14 wystąpień `clamp()` w [style.css](style.css) (linie 46, 86, 121, 127, 135, 138, 141, 144, 148, 177, 194, 226, 230, 256) odpowiednimi zmiennymi CSS

1.3. Zamień hardkodowane kolory (`#000`, `black`, `white`, `#ffffff`) na `var(--color-*)` w całym [style.css](style.css)

1.4. Dodaj `font-family: var(--font-primary), var(--font-fallback)` do selektora `body` lub stwórz nowy selektor globalny

**Pliki**: [style.css](style.css)  
**Dotknięte linie**: ~80-100 linii (30-50 zmian + nowa sekcja :root ~40 linii)

---

#### **Krok 2: Konsolidacja - Przeniesienie inline CSS do style.css**
*Kolejność: Drugi, by mieć pełny obraz wszystkich styli przed refaktoryzacją nazw*

2.1. Przeanalizuj wszystkie bloki `<style>` w 9 plikach HTML (łącznie ~287 linii):
   - [index.html](index.html) linie 71-143
   - [produkty.html](produkty.html) linie 9-25
   - [aktualnosci.html](aktualnosci.html) linie 9-32
   - [kontakt.html](kontakt.html) linie 9-53
   - [misja.html](misja.html) linie 18-68
   - [dobrostan.html](dobrostan.html) linie 14-32
   - [program.html](program.html) linie 13-22
   - [kariera.html](kariera.html) linie 13-21
   - [partnerzy.html](partnerzy.html) linie 18-32
   - [przyszlosc.html](przyszlosc.html) linie 13-36

2.2. Stwórz nową sekcję w [style.css](style.css) (po istniejących stylach, przed linią 500): `/* === Page-specific styles === */`

2.3. Przenieś unikalne style page-specific do [style.css](style.css) z zachowaniem selektorów (np. `.news`, `.contact-main-container`, `.kariera-container`)

2.4. Dla wskaźników aktywnej strony menu (linie ~15-20 w każdym HTML):
   - Stwórz klasę pomocniczą `.menu__item--active` w [style.css](style.css):
     ```css
     .menu__item--active {
       text-decoration: underline;
       cursor: not-allowed;
     }
     ```
   - NIE edytuj jeszcze HTML (to będzie w kroku 4 przy refaktoryzacji menu)

2.5. Usuń wszystkie bloki `<style>...</style>` z 9 plików HTML

**Pliki**: [style.css](style.css), wszystkie 9 HTML  
**Dotknięte linie**: ~287 linii inline → ~250 linii w style.css + 9 usunięć

---

#### **Krok 3: Nazewnictwo - Pełna migracja do BEM**
*Kolejność: Trzeci, by uzyskać spójne nazewnictwo przed refaktoryzacją komponentów*

3.1. **Mapowanie starych → nowych nazw BEM:**

**Ogólne/Layout:**
- `.top` → `.header`
- `.wrapper` → `.page-wrapper`
- `.container` → `.content-container` (jeśli używane globalnie, inaczej wchodzi do konkretnych bloków)
- `.adventages-container` → `.advantages` (naprawa błędu ortograficznego + block BEM)

**Logo:**
- `.logo-container` → `.header__logo-container`
- `.logo` → `.header__logo`
- `.logo-container-media` → `.header__logo-container--media` (modifier)

**Menu (szczegóły w kroku 4, ale nazwy ustal teraz):**
- `.menu` → `.nav` (block)
- `.menu a` → `.nav__link`
- `.menu__farm`, `.menu__news`, etc. → `.nav__item` (ogólna klasa dla wszystkich)
- ~~`.menu__products-list`~~ → naprawienie struktury HTML w kroku 4

**Footer:**
- `.footer-menu` → `.footer-nav` (zachowanie BEM, poprawa semantyki)
- `.footer-menu__dobrostan` → `.footer-nav__link` (ujednolicenie elementów)
- `.footer-button` → `.footer__button`

**Advantages (pro-*):**
- `.pro-container` → `.advantages__item`
- `.pro-img` → `.advantages__image`
- `.pro-title` → `.advantages__title`
- `.pro-description` → `.advantages__description`

**Polish Quality:**
- `.polish-quality-container` → `.quality` (block)
- `.polish-quality-container-img` → `.quality__image`

**Video:**
- `.video-container` → `.video` (block, linia 20)

**Farm section (uproszczenie głębokości z 5 do max 2 poziomów BEM):**
- `.farm` → `.products-section` (block - zmiana nazwy na bardziej semantyczną)
- `.farm__products-header-container` → `.products-section__header`
- `.farm__products-header-container__products-header-img` → `.products-section__header-image`
- `.farm__products-header-container__wrap` → `.products-section__header-content`
- `.farm__products-container__products-header-description` → `.products-section__description` (skrócenie)
- `.farm__products-container__products-header-footer` → `.products-section__footer-text`
- `.farm__products-main-container__products-main` → Patrz krok 5 (osobny komponent bazowy)
- `.farm__products-main-container__products-main__products-main-title` → Patrz krok 5
- `.farm__products-main-container__products-main__products-main-description` → Patrz krok 5

3.2. Stwórz dokument pomocniczy (może być komentarz na początku [style.css](style.css) lub osobny plik `BEM-MAPPING.md`): tabela stare → nowe nazwy

3.3. **Wykonaj zamianę w [style.css](style.css):**
   - Find & Replace dla każdej pary (dla bezpieczeństwa: pojedynczo, nie wszytko na raz)
   - Zachowaj polskie komentarze explanatory (linie 52, 187-191, 218)

3.4. **Wykonaj zamianę we wszystkich 9 plikach HTML:**
   - Find & Replace dla każdej klasy w całym projekcie
   - **Uwaga**: Nie zmieniaj jeszcze struktury HTML (np. menu), tylko nazwy klas

**Pliki**: [style.css](style.css), wszystkie 9 HTML  
**Dotknięte linie**: ~500+ linii (ale automatyczne Find & Replace)  
**Ryzyko**: Niskie (mechaniczna zamiana, odwracalna)

---

#### **Krok 4: Menu - Refaktoryzacja struktury i DRY**
*Kolejność: Czwarty, po ustaleniu nazw BEM i przeniesieniu inline styles*

4.1. **Napraw nieprawidłowy HTML** w menu (obecnie: `<ul class="menu__products-list"><a>`):
   - Zamień na: `<li class="nav__item"><a href="produkty.html" class="nav__link">Produkty</a></li>`
   - To naprawia błąd walidacji (ul może zawierać tylko li)

4.2. **Zunifikuj strukturę menu** w [index.html](index.html) (linie ~30-45):
   ```html
   <header class="header">
     <div class="header__logo-container">
       <img class="header__logo" src="..." alt="Logo Farmy">
     </div>
     <nav class="nav">
       <ul class="nav__list">
         <li class="nav__item nav__item--active"><a href="index.html" class="nav__link">Farma</a></li>
         <li class="nav__item"><a href="aktualnosci.html" class="nav__link">Aktualności</a></li>
         <li class="nav__item"><a href="produkty.html" class="nav__link">Produkty</a></li>
         <li class="nav__item"><a href="kontakt.html" class="nav__link">Kontakt</a></li>
         <li class="nav__item"><a href="misja.html" class="nav__link">Nasza Misja</a></li>
       </ul>
     </nav>
   </header>
   ```

4.3. **Dodaj odpowiednie style do [style.css](style.css)** (zastępując linie 53-109):
   - `.header` (dawniej .top)
   - `.header__logo-container`, `.header__logo`
   - `.nav` (dawniej .menu)
   - `.nav__list` (nowy: list-style: none, flex)
   - `.nav__item` 
   - `.nav__link` (podstawowy stan)
   - `.nav__item--active .nav__link` (underline, cursor: not-allowed)
   - Użyj `var(--text-base)` dla font-size

4.4. **Skopiuj zunifikowane menu do pozostałych 8 plików HTML**:
   - Tylko zmień klasę `.nav__item--active` na odpowiedni item dla każdej strony:
     - [aktualnosci.html](aktualnosci.html): drugi item (Aktualności)
     - [produkty.html](produkty.html): trzeci item (Produkty)
     - [kontakt.html](kontakt.html): czwarty item (Kontakt)
     - [misja.html](misja.html): piąty item (Nasza Misja)
     - Pozostałe strony: bez `--active` (jeśli nie mają dedykowanego menu item) lub dodaj nowe pozycje

4.5. **Usuń zduplikowany selektor** `.products-list` (linie 106-109 [style.css](style.css)) - był duplikatem `.menu .menu__products-list`

**Pliki**: [style.css](style.css) (linie 44-109), wszystkie 9 HTML (linie ~30-50 każdy)  
**Dotknięte linie**: ~60 linii CSS + ~180 linii HTML (9 plików × ~20 linii menu)

---

#### **Krok 5: Produkty - Wspólny komponent bazowy, osobne nazwy**
*Kolejność: Piąty, bo wymaga wcześniejszych kroków (BEM, custom properties)*

**Decyzja użytkownika**: Wspólny komponent bazowy, ale nazwy klas muszą się wyróżniać

5.1. **Stwórz wspólny komponent bazowy `product-card`** w [style.css](style.css):
   ```css
   /* === Product Card Component (base) === */
   .product-card {
     display: flex;
     /* ...wspólne style z obecnego .farm__products-main-container__products-main */
   }
   
   .product-card__title {
     font-size: var(--text-xl);
     /* ...style z .farm__products-main-container__products-main__products-main-title */
   }
   
   .product-card__description {
     font-size: var(--text-sm);
     /* ...style z .farm__products-main-container__products-main__products-main-description */
   }
   ```

5.2. **Dla [index.html](index.html) (sekcja "Nasze Produkty", linie 163-219):**
   - Zmień `.farm` → `.products-section` (już w kroku 3)
   - Zmień długie nazwy (np. `.farm__products-main-container__products-main`) na:
     - Container: `.farm-products` (block, wyróżniająca nazwa)
     - Karty: `.farm-products__card` (rozszerza `.product-card` w HTML: `class="product-card farm-products__card"`)
     - Tytuł: `.farm-products__title` (rozszerza `.product-card__title` w HTML)
     - Opis: `.farm-products__description` 
   
   **W [style.css](style.css)** dodaj tylko style specyficzne dla farm-products (jeśli są różnice od bazowego):
   ```css
   .farm-products { /* kontener na karty w index.html */ }
   .farm-products__card { /* dodatek do .product-card jeśli potrzebny */ }
   ```

5.3. **Dla [produkty.html](produkty.html) (linie 52-78):**
   - Obecnie używa `.products-main-container__*` BEZ CSS (orphaned classes)
   - Zmień na:
     - Container: `.produkty` (block, inna nazwa niż index.html)
     - Karty: `class="product-card produkty__card"`
     - Tytuł: `class="product-card__title produkty__title"` (jeśli trzeba nadpisać)
     - Opis: `class="product-card__description produkty__description"`

   **W [style.css](style.css)** dodaj:
   ```css
   .produkty { /* kontener specyficzny dla produkty.html */ }
   .produkty__card { /* modyfikacje jeśli potrzebne */ }
   ```

5.4. **Napraw niespójność w [index.html](index.html) linia 202** (sekcja WĘDLINY):
   - Obecnie używa `.products-main-container__*` (bez `farm__`)
   - Zmień na `.farm-products__card`, `.farm-products__title` itd. (jak reszta index.html)

**Pliki**: [style.css](style.css) (linie 218-257), [index.html](index.html) (linie 163-219), [produkty.html](produkty.html) (linie 52-78)  
**Dotknięte linie**: ~120 linii (40 CSS + 60 HTML index + 20 HTML produkty)

---

#### **Krok 6: .farm / products-section - Finalizacja refaktoryzacji**
*Kolejność: Ostatni, bo zależy od wszystkich poprzednich kroków*

6.1. **Zaktualizuj style `.products-section`** (dawniej `.farm`, linie 181-196 [style.css](style.css)):
   - Zmień selektor na `.products-section`
   - Zastąp `font-size: clamp(...)` → `font-size: var(--text-sm)`
   - Zastąp `padding: 40px` → `padding: var(--space-xl)`
   - **ZACHOWAJ** `background: white;` z komentarzem (linia 189) - użytkownik potwierdził, że to intencjonalne

6.2. **Uprość zagnieżdżone selektory** (linie 218-257):
   - Zastąp długie nazwy z kroku 3.1 (np. `.farm__products-container__products-header-description`)
   - Nowe nazwy: `.products-section__header`, `.products-section__description` itd.
   - Użyj CSS custom properties dla rozmiarów i kolorów

6.3. **Zaktualizuj HTML w [index.html](index.html)** (linie 163-219):
   - Zmień `<div class="farm">` → `<div class="products-section">`
   - Zastosuj nowe nazwy klas z kroku 6.2
   - Usuń pusty `<div class="farm__products-main-container">` (linia 195)

6.4. **Weryfikacja**: Upewnij się, że:
   - Sekcja produktów ma białe tło (zachowane z linii 189)
   - Video nie "rozpływa się" poza obszar
   - Nazwy klas są max 2-poziomowe BEM (`.products-section__element`, nie głębiej)

**Pliki**: [style.css](style.css) (linie 181-257), [index.html](index.html) (linie 163-219)  
**Dotknięte linie**: ~130 linii (80 CSS + 50 HTML)

---

### **Weryfikacja**

Po każdym kroku:
1. **Walidacja HTML**: Użyj walidatora W3C (https://validator.w3.org/) - szczególnie po kroku 4 (naprawa menu)
2. **Test wizualny**: Otwórz każdą z 9 stron w przeglądarce, sprawdź:
   - Czy wszystkie style się aplikują (brak "gołych" elementów)
   - Czy menu działa poprawnie (aktywna strona podkreślona)
   - Czy video nie wychodzi poza obszar (szczególnie po kroku 6)
   - Czy produkty wyglądają identycznie na index.html i produkty.html (wspólny komponent bazowy)
3. **Responsive test**: Sprawdź na mobile/tablet (co najmniej Chrome DevTools)
4. **Walidacja CSS**: Opcjonalnie użyj CSS validator

**Komendy weryfikacyjne** (jeśli masz dostęp do terminala):
```bash
# Znajdź nieużywane klasy CSS (po refaktoryzacji)
grep -r "class=" *.html | grep -o 'class="[^"]*"' | sort | uniq > used-classes.txt
# Porównaj z klasami w style.css
```

**Checklist końcowy:**
- [ ] Wszystkie 14 `clamp()` zastąpione CSS custom properties
- [ ] 0 bloków `<style>` w plikach HTML (wszystko w style.css)
- [ ] 0 błędów walidacji HTML (szczególnie menu: ul>li>a)
- [ ] Wszystkie nazwy klas zgodne z BEM (max 2 poziomy zagnieżdżenia)
- [ ] index.html i produkty.html używają wspólnego `.product-card`, ale mają osobne bloki (`.farm-products` vs `.produkty`)
- [ ] Białe tło `.products-section` zachowane (linia 189)
- [ ] Font-family ustawiony w `:root` i zastosowany globalnie
- [ ] Używany rem jako główna jednostka

---

### **Decyzje**

- **Rem over em**: Rem jako standard dla wszystkich rozmiarów (łatwiejsze skalowanie, zgodne z 2026 best practices), em tylko dla padding/margin wewnątrz komponentów jeśli będzie potrzeba kontekstowej zależności
- **Inter jako font**: Nowoczesna, uniwersalna, dobra czytelność, darmowa (alternative: Open Sans jeśli wolisz bardziej klasyczny wygląd) - **wymaga potwierdzenia w następnej iteracji**
- **Kolejność kroków**: Fundament (zmienne) → Konsolidacja (inline CSS) → Nazewnictwo (BEM) → Komponenty (menu → produkty → .farm) minimalizuje konieczność powracania i poprawiania
- **`.farm` → `.products-section`**: Bardziej semantyczna nazwa (`.farm` to nazwa strony/projektu, nie sekcji), ale zachowuje białe tło zgodnie z życzeniem użytkownika
- **Wspólny komponent + osobne nazwy**: `.product-card` jako bazowy komponent w style.css, `.farm-products` i `.produkty` jako bloki kontekstowe - rozwiązanie DRY bez ryzyka pomyłki
- **Menu repair**: Naprawa invalid HTML (`<ul><a>`) na zgodne `<ul><li><a>` - konieczne dla semantyki i dostępności
- **Inline CSS → external**: Migracja całych ~287 linii inline styles do style.css dla łatwiejszego utrzymania, cachowania i spójności

---

**Czas realizacji** (szacowany):
- Krok 1: 1-2h (tworzenie zmiennych + zamiana 14 clamp())
- Krok 2: 2-3h (analiza + przeniesienie ~287 linii)
- Krok 3: 2-3h (mapowanie + mechaniczna zamiana, ale wymagająca uwagi)
- Krok 4: 1-2h (menu w 9 plikach + CSS)
- Krok 5: 2-3h (wspólny komponent + 2 konteksty)
- Krok 6: 1h (finalizacja .products-section)
- **Łącznie: 9-14h** (zależnie od doświadczenia i środowiska pracy)

---

To jest plan wersja **DRAFT**. Proszę o feedback:
- Czy Inter jako czcionka jest ok, czy masz inną preferencję?
- Czy kolejność kroków ma sens dla Twojego flow pracy?
- Czy są jakieś inne aspekty projektu, które powinienem uwzględnić?
