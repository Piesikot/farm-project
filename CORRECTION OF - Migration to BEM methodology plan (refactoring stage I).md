# CORRECTION OF - Migration to BEM methodology plan (refactoring stage I)

## General Guidelines

- Leave all existing comments in HTML/CSS untouched.
- AI-added comments must be in English and marked with the Copilot symbol "🤖".
- Every added comment must explain what changed and why.
- Stage I keeps replaced code as commented legacy (not active code) for easy review and rollback.

## Purpose

This document defines a production-ready Stage I correction plan for class naming and selector consistency.

Primary method:

- BEM naming in getbem style: `block-name__elem-name--mod-name`

Reference:

- [getbem](https://getbem.com)

## Scope

In scope (Stage I):

- Class naming correction and selector consistency.
- Removal of element-of-element naming patterns.
- Menu and offer naming normalization.
- Safe, reversible migration flow with clear legacy comments.

Out of scope (Stage I):

- Full accessibility implementation (only TODO notes for later stages).
- Visual redesign.
- Feature-complete dropdown behavior.

## Frozen Decisions (Approved)

1. Naming rule is frozen to getbem style.
2. OOCSS/SMACSS are treated separately as CSS organization principles, not as naming rules.
3. Dropdown in menu is a separate structure.
4. Legacy code may remain commented for clarity and rollback, but must never remain active in parallel with new selectors.
5. Accessibility is deferred; only explicit comments/TODO markers are required in Stage I.

## Clarification of Quality Gates (previous point 6)

In this plan, quality gates mean build-time and review-time checks that reduce regressions during migration.

Stage I required gates:

- Naming-pattern checks (regex/grep).
- HTML/CSS class sync checks.
- Manual smoke test on all pages.

Deferred gates (next stages):

- Accessibility audits (axe/Lighthouse or equivalent).

## Confirmed Violations To Fix

1. Element-of-element classes in menu and offer section.
2. `menu__products-list` is currently used as a top-level item and must be normalized.
3. One orphan modifier case exists in products navigation state.
4. Inconsistent naming in mission counter: `kill-counter-farm`, `kill-counter-livestock`.
5. Tag-coupled selectors are still present for BEM entities.

## Canonical Rename Map (Stage I)

### Menu (all pages + CSS)

- `topbar__menu` -> `menu`
- `topbar__menu__item` -> `menu__item`
- `topbar__menu__button` -> `menu__button`
- `topbar__menu__item--active` -> `menu__item--active`

Products item policy:

- Current top-level products item class use must become: `menu__item menu__products`
- Active products page state must be: `menu__item menu__products menu__item--active`
- `menu__products-list` is reserved for the future dropdown list container and remains commented/inactive in MVP.

Rule:

- Every active menu item must contain both classes: `menu__item` and `menu__item--active`.
- Every footer modifier must contain the base class `footer-menu__item`
   (`footer-menu__item footer-menu__item--centered`,
   `footer-menu__item footer-menu__item--active`).

### Offer section (`index.html` + `style.css`)

- `offer-content__worldwide-offer` -> `worldwide-offer`
- `offer-content__worldwide-offer__header` -> `worldwide-offer__header`
- `offer-content__worldwide-offer__content` -> `worldwide-offer__content`
- `offer-content__worldwide-offer__img` -> `worldwide-offer__icon-container`
- `offer-content__worldwide-offer__img img` -> `worldwide-offer__icon`
- `offer-content__worldwide-offer__description` -> `worldwide-offer__description`
- `offer-content__worldwide-offer__footer` -> `worldwide-offer__footer`
- `offer-content__local-offer-content` -> `local-offer`
- `offer-content__category` -> `local-offer__category`
- `offer-content__category__title` -> `local-offer__category-title`
- `offer-content__category__description` -> `local-offer__category-description`

### Mission counter (`misja.html` + `style.css`)

- `kill-counter-farm` -> `kill-counter__farm`
- `kill-counter-livestock` -> `kill-counter__livestock`

## Legacy Commenting Standard (Mandatory)

Keep old code commented with a clear reason and migration target.

Recommended format:

```css
/* LEGACY-STAGE1: replaced .topbar__menu__item with .menu__item for getbem consistency. Inactive by design. */
/* .topbar__menu__item { ... } */
```

Rules:

- Legacy selectors/classes must be commented, never active.
- Keep comments short, explicit, and grep-friendly (`LEGACY-STAGE1`).
- Keep related legacy comments close to the new rule.

## Execution Order (Safe, Reversible)

### Batch A: Menu correction (all HTML pages + `style.css`)

Scope:

- `index.html`
- `aktualnosci.html`
- `produkty.html`
- `kontakt.html`
- `misja.html`
- `dobrostan.html`
- `program.html`
- `kariera.html`
- `partnerzy.html`
- `przyszlosc.html`
- `style.css`

Acceptance:

- No active legacy menu classes remain: `topbar__menu`, `topbar__menu__item`, `topbar__menu__button`, `topbar__menu__item--active`.
- `menu` is the canonical block inside topbar.
- All active states include base + modifier (`menu__item` + `menu__item--active`).
- Top-level products entry uses `menu__products`.
- `menu__products-list` exists only as inactive/commented dropdown structure in MVP.

### Batch B: Offer correction (`index.html` + `style.css`)

Acceptance:

- No `offer-content__*__*` classes remain in active code.
- Layout and typography remain visually equivalent.

### Batch C: Mission counter correction (`misja.html` + `style.css`)

Acceptance:

- No `kill-counter-farm` or `kill-counter-livestock` remains in active code.
- Counter styles still apply.

### Batch D: Selector hardening (class-first)

Actions:

- Replace tag-coupled selectors for BEM entities with class-based selectors.
- Add explicit helper classes in HTML where needed.

Acceptance:

- Component selectors target classes, not nested tags.

## Verification Checklist (Stage I)

1. Forbidden element-of-element pattern:
   - regex: `[a-z0-9-]+__[a-z0-9-]+__[a-z0-9-]+`
   - expected: zero active matches for BEM entities.
2. Legacy menu pattern check:
   - find: `topbar__menu__`
   - expected: zero active matches.
3. Products structure check:
   - top-level products item uses `menu__products`.
   - `menu__products-list` is only commented/inactive in MVP.
4. Modifier base check:
   - every `menu__item--active` also contains `menu__item`.
   - every `footer-menu__item--centered` also contains `footer-menu__item`.
   - every `footer-menu__item--active` also contains `footer-menu__item`.
5. CSS/HTML sync check:
   - renamed classes exist in both HTML and CSS where expected.
6. Manual smoke test:
   - topbar/menu active state on each page.
   - offer section layout and responsiveness.
   - no visual regressions in mission counter.
7. Accessibility note:
   - add TODO comments only (full a11y implementation deferred).

## Questions and Answers (resolved)

1. Naming convention: getbem style.
2. Products dropdown: separate structure.
3. Rollback strategy: keep legacy code commented with clear comments.

## Definition of Done

- Stage I uses a consistent getbem naming convention.
- No active element-of-element class names remain.
- No active orphan elements/modifiers remain.
- CSS selectors are aligned with final class names.
- Legacy replacements are preserved as clear inactive comments.
- Navigation and core content render correctly on desktop and mobile.

## Notes

- This plan is naming-first and intentionally conservative.
- Visual redesign remains out of scope for Stage I.
- Full accessibility rollout is intentionally scheduled for later stages.
