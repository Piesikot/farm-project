### Refactoring Stage II - Typhogaphy migration

Setting :root, CSS variables and spacing units to rem/em.

**Key decisions**
- Keep the white background of the former `.farm` section (intentional behavior).
- Use `rem` as the primary unit; `em` only when context-relative spacing is needed.
- Preserve current sizes and spacing (tokenize 1:1, no visual changes in this stage).
- Fonts: Display = Fraunces; Body = Inter (with fallbacks).
- Keep the current breakpoint (1050px) for now; adjust sizes later and set a new breakpoint at the end of the refactor.
- Leave all existing comments in HTML/CSS untouched; in case you generate your own code, do it in English language and mark it using Copilot symbol "🤖" so it is clear which comments are AI-added.
- State and describe in comments, what you changed and why, to keep intent transparent, do in English language and mark it using Copilot symbol "🤖" .
- Comment out previous styles instead of deleting, to preserve original intent and allow easy rollback if needed.

## Scope and definitions
- Add a `:root` block at the top of style.css defining:
  - Fonts: `--font-display` (Fraunces), `--font-body` (Inter), `--font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`.
  - Font loading note: add a single `@import` or `<link>` (preferred in HTML head) for Fraunces + Inter so every page shares the same font source.
  - Typography tokens as clamp() values: `--text-xs, --text-sm, --text-base, --text-md, --text-lg, --text-xl, --text-2xl` (mirror former clamp values).
  - Spacing: `--space-xs ... --space-xl`.
  - Colors: `--color-text, --color-bg, --color-text-inverse, --color-bg-inverse`, plus tokens for current accents and UI neutrals (e.g., muted text, borders, surfaces, overlays, and brand green if kept).
  - Inventory shared image sizes and spacing values in style.css and inline `<style>` blocks (logo sizes, advantages icons, polish seal, worldwide globe, partners grid logos, menu/header paddings, contact icons, and alert overlay) and convert them into tokens before replacing declarations.
  - Introduce image size tokens (e.g., `--size-logo`, `--size-advantage-icon`, `--size-seal`, `--size-globe`, `--size-partner-logo`, `--size-contact-icon`) and tokenized padding/gap values for shared components; keep the 1050px breakpoint values tokenized.
  - Normalize repeated inline `<style>` overrides in HTML pages (notably `.topbar__logo` on subpages) by moving tokenized rules into style.css and commenting out the inline originals.
  - Comment out old declarations and add the tokenized version immediately after, to avoid ambiguity and keep rollback simple.

## Execution order
1) Inventory current shared image sizes, spacing values, and inline `<style>` overrides across all HTML pages (including the `.alert` block in index.html and repeated `.topbar__logo` overrides on subpages).
2) Add :root tokens for fonts, typography (clamp-based), spacing, colors (including existing accent/neutral values), and shared image sizes.
3) Apply global font-family (Fraunces for headings if scoped, Inter for body) and update selectors to use tokens.
4) Replace clamp() usages with typography tokens (tokens remain clamp-based).
5) Replace hardcoded colors (`#000`, `black`, `white`, `#ffffff`) with color tokens.
6) Tokenize shared paddings/gaps and image sizes 1:1 (no visual changes).
7) Keep breakpoint at 1050px (no new breakpoint in this stage).
8) Comment out previous declarations and add tokenized replacements immediately after.