# TrophyLog Website — Design System

> Restrained luxury. Leica, not Apple. Dark forest palette with brass gold accents.
> The product presents itself — it doesn't explain itself. Confident, quiet, earned.

---

## Intent

**Who:** Hunters who take their craft seriously. They value tradition, quality equipment, and the story behind each hunt.

**What:** A campaign website that presents TrophyLog — the app and the physical medal product. Entry point to download.

**Feel:** High-end product page. Like holding a quality rifle scope or opening a Leica box. Restrained, premium, unhurried.

---

## Colors

### Backgrounds

| Token             | Hex       | Usage                     |
|-------------------|-----------|---------------------------|
| bg                | `#080C0A` | Page background           |
| surface           | `#111916` | Cards, elevated sections  |
| surfaceHighlight  | `#1A2420` | Phone screen placeholders |

### Text

| Token          | Hex       | Usage                     |
|----------------|-----------|---------------------------|
| text           | `#D8DDD9` | Headings, body            |
| textSecondary  | `#6B7B6E` | Captions, secondary copy  |
| textTertiary   | `#4A5A4D` | Disabled, borders         |

### Accents

| Token     | Hex       | Usage                             |
|-----------|-----------|-----------------------------------|
| gold      | `#C9A04E` | Brand mark, section labels, medal |
| goldMuted | 15% alpha | Selection highlight               |
| green     | `#4ADE80` | Buttons, links (interactive only) |

> **Green is reserved for interactive states.** Never decorative. Gold carries the brand.

---

## Typography

**Display:** Playfair Display (serif) — evokes engraving, craftsmanship, tradition.
**Body:** Inter — continuity with the mobile app.

### Scale

| Role           | Size                    | Weight | Font    |
|----------------|-------------------------|--------|---------|
| Hero title     | clamp(48px, 8vw, 72px)  | 700    | Display |
| Section title  | clamp(32px, 5vw, 48px)  | 700    | Display |
| CTA title      | clamp(36px, 6vw, 56px)  | 700    | Display |
| Brand (nav)    | 20px                    | 700    | Display |
| Story text     | clamp(20px, 3vw, 28px)  | 400    | Body    |
| Body           | 18px                    | 400    | Body    |
| Section label  | 13px                    | 600    | Body    |

---

## Spacing

**Base unit:** 4px (inherited from mobile app)
**Section gap:** `clamp(120px, 15vh, 200px)` — extreme whitespace between sections.
**Content width:** 960px max, 680px for narrow/text sections.
**Page padding:** `clamp(20px, 5vw, 48px)`

---

## Depth

**Strategy:** The darkness is the depth. Almost flat.

- No card shadows on content
- Phone mockups: heavy bottom shadow (`0 40px 100px -20px rgba(0,0,0,0.7)`)
- Medal: radial gradient + ring shadows for metallic effect
- Navigation: gradient fade from bg to transparent

---

## Components

### Phone Frame

```
width: 280px (hero) / 240px (feature)
height: 580px / 500px
borderRadius: 44px / 38px
border: 2px solid #2A3530
background: #0F1612
notch: centered, dark, rounded
shadow: layered — subtle gold ring, heavy bottom, medium spread
```

### Store Badge

```
SVG-based, dark surface fill
border: 0.5px textTertiary stroke
borderRadius: 6px
hover: opacity 0.8
```

### Section Label

```
font: 13px, weight 600, Inter
letterSpacing: 0.12em
textTransform: uppercase
color: gold
marginBottom: 16px
```

### Medal Visual

```
circle: 200px diameter
gradient: radial, gold highlights
rings: 3px gold at 20%, 8px gold at 6%
QR placeholder: 56px square, dark overlay
metallic shine: radial white gradient overlay
```

---

## Patterns

### Content is centered and narrow
All text content stays within 680px. Feature layouts use flex with generous gaps.

### Sections alternate layout direction
Feature blocks alternate phone-left/phone-right using `flex-direction: row-reverse`.

### Mobile collapses to column
All horizontal layouts stack vertically below 768px with centered text.

### Copy is restrained
Short sentences. No exclamation marks. Verbs first. The product speaks.

---

## Relationship to Mobile App

This website inherits the mobile app's color DNA (`#0F1612` scaffold, `#4ADE80` green, `#D4A853` gold) but shifts it for a marketing context:

- Background is darker (`#080C0A` vs `#0F1612`) for richer contrast on large screens
- Gold is slightly desaturated (`#C9A04E`) for web rendering
- Serif headlines replace Inter headings — appropriate for editorial/campaign tone
- Green remains interactive-only, consistent with the app
