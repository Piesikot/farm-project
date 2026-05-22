🔴⚠ DALEJ JEST TU NIEPOPRAWNE NAZEWNICTWO!!! ⚠ 🔴

***Migration to BEM methodology***

---

**General guidelines**
- Leave all existing comments in HTML/CSS untouched; in case you generate your own code, do it in English language and mark it using Copilot symbol "🤖" so it is clear which comments are AI-added.
- In comments, state what you changed and why, to keep intent transparent.
- Comment out previous styles instead of deleting, to preserve original intent and allow easy rollback if needed.

**Key decisions**
- Separate class names for index.html vs produkty.html (no shared product block names across pages).
- Move all inline CSS into style.css; only alert in index.html must remain in this file.
- For this migration stage, use mapped class names as the source of truth, including existing multi-element naming already present in the project.

---

### Old → New BEM map (authoritative, use first)

**Topbar (all pages)**
- `.top` → `.topbar`
- `.logo-container` → `.topbar__logo-container`
- `.logo` → `.topbar__logo`
- `.menu` → `.topbar__menu`
- `.menu__farm`, `.menu__news`, `.menu__contact`, `.menu__mission` → `.topbar__menu__item`
- `.menu a` → `.topbar__menu__button`
- `.topbar__menu__item--active` (active state)
- `.menu__products-list` → keep (future dropdown)

**Layout**
- `.container` → `.page`
- `.wrapper` → keep (do not rename/remove in this migration stage)
- `.adventages-container` → `.advantages`

**Footer**
- `.footer-menu` → `.footer-menu`
- `.footer-menu__dobrostan`, `.footer-menu__program`, `.footer-menu__kariera`, `.footer-menu__partnerzy` → `.footer-menu__item`
- `.footer-menu a` → `.footer-menu__button`
- `.footer-menu__copyright` → `.footer-menu__item--centered`
- `.footer-button` → `.footer-menu__button`

**Advantages**
- `.pro-container` → `.advantages__card`
- `.pro-img` → `.advantages__img`
- `.pro-title` → `.advantages__title`
- `.pro-description` → `.advantages__description`

**Polish Quality**
- `.polish-quality-container` → `.polish-quality`
- `.polish-quality-container-img` → `.polish-quality__seal`

**Video**
- `.video-container` → `.video-container`
- `.video-container__video` → `.video-container__video`
- `.video-container__video--dog-farm` (modifier)

**Offer (index.html)**
- `.farm` → `.offer-content`
- `.farm__products-header-container` → `.offer-content__worldwide-offer`
- `.farm__products-header-container__products-header-img` → `.offer-content__worldwide-offer__img`
- `.farm__products-header-container__wrap` → `.offer-content__worldwide-offer__content`
- `.farm__products-container__products-header-description` → `.offer-content__worldwide-offer__description`
- `.farm__products-container__products-header-footer` → `.offer-content__worldwide-offer__footer`
- `.farm__products-main-container` → `.offer-content__local-offer-content`
- `.farm__products-main-container__products-main` → `.offer-content__category`
- `.farm__products-main-container__products-main__products-main-title` → `.offer-content__category__title`
- `.farm__products-main-container__products-main__products-main-description` → `.offer-content__category__description`

**Produkty (produkty.html)**
- `.products-main-container__products-main` → `.products-section`
- `.products-main-container__products-main__products-main-title` → `.products-section__title`
- `.products-main-container__products-main__products-main-description` → `.products-section__description`

**Aktualnosci (aktualnosci.html)**
- `.news` → `.news-section`
- `.news-wrapper` → `.news-section__wrapper`
- `.news__news-img`, `.news img` → `.news-section__img`
- `.news-title` → `.news-section__title`
- `.news-description` → `.news-section__description`
- `.news-date` → `.news-section__date`

**Kontakt (kontakt.html)**
- `.contact-main-container` → `.contact`
- `.contact-main-container img` → `.contact__icon`
- `.contact-main-container__facebook`, `.contact-main-container__messenger`, `.contact-main-container__instagram` → `.contact__item`
- Modifiers: `.contact__item--facebook`, `.contact__item--messenger`, `.contact__item--instagram`

**Misja (misja.html)**
- `.future` → `.mission-intro`
- `.facts` → `.arguments`
- `.facts h3` → `.arguments__title`
- `.facts li` → `.arguments__item`
- `.counter-header` → `.kill-counter__header`
- `.counter-container` → `.kill-counter`

**Dobrostan (dobrostan.html)**
- `.dobrostan-container` → `.welfare-policy`
- `.signature-container` → `.welfare-policy__signature`

**Program (program.html)**
- `.program-container` → `.program`
- `.program-container__program-header` → `.program__header`
- `.program-container__program-main` → `.program__content`
- `.program-container__program-main__program-main-description` → `.program__description`
- `.program-container__program-main__program-main-category` → `.program__category`
- `.program-container__program-main__category` → `.program__category`

**Kariera (kariera.html)**
- `.kariera-container` → `.career`
- `.career__header`
- `.career__content`
- `.career__job-list`
- `.career__job-item`

**Partnerzy (partnerzy.html)**
- `.partners` → `.partners`
- `.partners__intro`
- `.partners__list`
- `.partners__item`
- `.partners__link`

**Przyszlosc (przyszlosc.html)**
- `.future` → `.vegan-future`
- `.org-list` → `.vegan-future__org-list`
- `.org-list ul li` → `.vegan-future__org-item`

## Execution Order (now scoped to mapping + migration only)
1) Map old → new BEM names (reference above).
2) Migrate to BEM in all HTML + style.css (find & replace step by step; allow required menu markup normalization to pass HTML validation).

---

### Step 1: BEM mapping (reference)
- Use the map above as the authoritative old → new list.
- Generate `BEM-MAPPING.md` for quick diffing.

---

### Step 2: Full BEM migration (HTML + CSS)
- Order: follow html files and style.css top-to-bottom while replacing selectors.
- Replace all class names in all 10 HTML files per the map.
- Replace all selectors in style.css per the map.
- Verify no legacy classes remain (grep for `.farm`, `.pro-`, `.menu__`, etc.).

Files: style.css + all 10 HTML files (`index.html`, `produkty.html`, `aktualnosci.html`, `kontakt.html`, `misja.html`, `dobrostan.html`, `program.html`, `kariera.html`, `partnerzy.html`, `przyszlosc.html`)

---

### Verification
- After each step: run HTML validation (W3C), visual check on all 10 pages, responsive check (Chrome DevTools), optional CSS validation.
- Verify class residue with grep for legacy patterns.

### Final checklist
- [ ] 0 inline `<style>` blocks in HTML (except optional alert in index.html)
- [ ] 0 HTML validation errors (especially menu ul>li>a)
- [ ] All class names follow the migration BEM map consistently (including existing multi-element patterns used in the map)
- [ ] Topbar (`.topbar`, `.topbar__menu__*`) applied on all 10 pages
- [ ] `.offer-content` with `.offer-content__worldwide-offer` and `.offer-content__local-offer-content` in index.html
- [ ] `.offer-content__category` items (MIĘSO, WĘDLINY, DANIA GOTOWE, KONSERWY, OFERTA DLA WEGETARIAN)
- [ ] `.products-section` present in produkty.html
