# AFR Enterprises — Design System

**"Editorial monochrome"** — the design language for the redesign, extracted from
**[nor.ma](https://nor.ma/)** with `/extract-design-system` plus live DOM/visual study
(the automated normalizer drops colors, so the real values below were recovered from
`.extract-design-system/raw.json` and confirmed against the live site).

The system is applied site-wide from **`app/globals.css` `:root`**. Legacy brand token
names (`--navy` / `--red` / `--accent` / `--bg-alt` …) are **remapped** onto it so every
component/page cascades from that one place. It replaces the earlier "dark-tech cyan"
palette entirely.

---

## Principle

Strictly **monochrome**: near-black ink on white and a warm-neutral off-white, two-step
grey text, hairline borders, soft tinted shadows, a signature 28px card radius, fully
rounded "pill" controls, and generous editorial whitespace. The **only** chromatic accent
(`--urgent`) is reserved for the **AOG emergency** moment — nothing else on the page uses
color. Hierarchy comes from **weight, size, and negative space**, not from hue.

## Color (recovered from nor.ma)

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0a0a0a` | primary text, dark buttons, brand mark |
| `--ink-soft` | `#1c1c1c` | button hover / raised dark |
| `--paper` | `#ffffff` | base surface |
| `--surface` | `#f5f5f5` | off-white section surface |
| `--muted` | `#6b6b6b` | secondary text |
| `--faint` | `#a1a1a1` | tertiary text / captions |
| `--line` | `rgba(10,10,10,.10)` | hairline border |
| `--dark` | `#0e0e0e` | dark section background |
| `--urgent` | `#cf4327` | **AOG only** — functional emergency accent |

Dark accent sections: **StatsStrip, AOG, Final CTA**. Everything else is light
(white / `--surface`), alternating for rhythm.

## Typography

nor.ma sets its whole site in **Suisse Int'l** (Klim — commercial, non-shippable). We use
**Geist** (Vercel, MIT) — the closest free neo-grotesque — loaded via the `geist` package in
`layout.js` (`--font-geist-sans`). One family drives every role.

- **Headings:** weight **600**, tight tracking (h1 `-0.035em`), line-height `1.02–1.15`.
- **Body:** weight 400, `--muted`, line-height `1.55`, measure ≤ ~56ch.
- **Eyebrow:** 12px, weight 500, `0.14em` uppercase, `--muted`.
- Scale: `12 · 14 · 16 · 18 · 22 · 28 · 36 · 44 · 56+` (fluid `--text-*`).

## Shape, shadow, motion

| Token | Value |
|---|---|
| `--radius` | **28px** (signature card) · `--radius-md` 18 · `--radius-sm` 12 |
| `--radius-pill` | `9999px` (all buttons, search, chips) |
| `--shadow` | `0 10px 22px -10px rgba(10,10,10,.12)` (soft, tinted) |
| `--shadow-lg` | `0 30px 60px -28px rgba(10,10,10,.22)` |
| `--container` | `1200px` · `--section-pad-y` `clamp(80px, 9vw, 136px)` |

Motion is CSS-only (no libraries): staggered hero load-in, hover lifts/reveals, a CSS
scroll-timeline reveal on the story statement, marquee logos, and an IntersectionObserver
stat count-up. All guarded by `prefers-reduced-motion`.

## Homepage section flow (mirrors nor.ma's narrative)

Hero → Trusted manufacturers (logo marquee) → Our story (statement) → How procurement
works (numbered) → The parts we source (photo bento) → Stats (dark) → Industries served →
AOG (dark + red) → Top-requested parts → Certifications → Testimonials → Final CTA (dark).

## Extraction artifacts

`.extract-design-system/raw.json` (real values — recovered here), `normalized.json`
(colors dropped by the extractor), `design-system/tokens.css` / `tokens.json` (auto
starter — reference only; the **applied** system lives in `app/globals.css`).
