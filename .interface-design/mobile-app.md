# TrophyLog Mobile — Design System

> Dark, instrument-grade aesthetic. Like quality optics (Swarovski scope, Garmin GPS).
> Map tiles stay light (standard OSM). Only UI chrome goes dark.

---

## Colors

### Backgrounds (3-tier)

| Token              | Hex         | Usage                          |
|--------------------|-------------|--------------------------------|
| scaffoldBackground | `#0F1612`   | Page background                |
| surface            | `#1A2420`   | Cards, panels, drawers, sheets |
| surfaceHighlight   | `#243029`   | Interactive/focused, inputs    |

### Text (3-tier)

| Token         | Hex       | Usage                    |
|---------------|-----------|--------------------------|
| textPrimary   | `#E8EDE9` | Headings, body, labels   |
| textSecondary | `#8B9B8E` | Captions, subtitles      |
| textTertiary  | `#5A6B5E` | Disabled, hints          |

### Accents

| Token        | Hex       | Usage                              |
|--------------|-----------|------------------------------------|
| primary      | `#4ADE80` | Active states, buttons, nav accent |
| primaryMuted | `#2D7A4A` | Subtle borders, outlines           |
| secondary    | `#D4A853` | Drawing preview, trophies          |
| danger       | `#DC2626` | Destructive actions, forbidden     |

### Borders

| Token         | Value              | Usage        |
|---------------|--------------------|--------------|
| border        | `#EAEAEA` at 10%   | Dividers     |
| borderFocused | `#4ADE80` at 20%   | Focus rings  |

### Map-specific

| Token                      | Value                | Notes                  |
|----------------------------|----------------------|------------------------|
| areaFill                   | `#4ADE80` at 30%     | Green polygon fill     |
| areaBorder                 | `#4ADE80`            | Green polygon stroke   |
| forbiddenAreaFill          | `#DC2626` at 30%     | Red polygon fill       |
| forbiddenAreaBorder        | `#DC2626`            | Red polygon stroke     |
| drawingPreviewFill         | `#D4A853` at 35%     | Amber preview fill     |
| drawingPreviewBorder       | `#D4A853`            | Amber preview stroke   |
| drawingPreviewVertex       | `#0F1612`            | Vertex dot             |
| drawingPreviewVertexActive | `#D4A853`            | Active vertex dot      |
| drawingPreviewMidpoint     | `#8B9B8E`            | Midpoint dot           |

> Map labels and vertex borders use `Colors.white`/`Colors.black87` because they sit on light map tiles.

---

## Typography

**Font:** Inter (via `google_fonts`)
**Mono:** JetBrains Mono — reserved for coordinates/measurements (future)

### Scale

| Name          | Size | Weight   | Usage                     |
|---------------|------|----------|---------------------------|
| screenTitle   | 28   | bold     | Screen headers (Areas, Contacts) |
| sheetTitle    | 20   | bold     | Form/sheet titles         |
| sectionTitle  | 18   | bold/w600| Section headers, app title|
| cardTitle     | 17   | bold     | Card primary text         |
| body          | 16   | normal   | Body text, menu items     |
| bodySmall     | 14   | normal   | Descriptions              |
| label         | 13   | normal   | Small labels              |
| caption       | 12   | normal   | Type labels, secondary info|

### Weights

| Weight       | Usage                    |
|--------------|--------------------------|
| bold (w700)  | Titles, headings         |
| w600         | Emphasized body, names   |
| w500         | Menu items               |
| normal (w400)| Body text                |

---

## Spacing

**Base unit:** 4px

| Step | Value | Usage                              |
|------|-------|------------------------------------|
| 1    | 4px   | Tight gaps (icon-to-text)          |
| 2    | 8px   | Default element spacing            |
| 3    | 12px  | Card inner padding, form field gaps|
| 4    | 16px  | Section padding, card margins      |
| 5    | 20px  | Form section gaps                  |
| 6    | 24px  | Sheet/form outer padding           |
| 8    | 32px  | Large section spacing              |
| 12   | 48px  | Hero spacing                       |

---

## Border Radius

| Value | Usage                              |
|-------|------------------------------------|
| 8px   | Inputs, buttons, snackbars         |
| 12px  | Cards                              |
| 16px  | Sheets, dialogs                    |
| 999px | Pills (mode indicator, action bar) |

---

## Depth

**Strategy:** Borders-first, shadows only for map overlays.

- Cards: `elevation: 0`, 1px `border` side
- AppBar: `elevation: 0`, `scrolledUnderElevation: 0`
- Bottom nav: top `BorderSide(color: border)`
- Inputs: 1px border, 1.5px on focus
- Sheets/panels over map: `BoxShadow(blurRadius: 12, color: black.withAlpha(64))`

---

## Components

### Card

```
color: surface
elevation: 0
border: 1px border
borderRadius: 12px
innerPadding: 12px
margin: 16px horizontal, 6px vertical
```

### Input

```
fill: surfaceHighlight
border: 1px border (default)
borderFocused: 1.5px primary
borderError: 1px danger
borderRadius: 8px
labelColor: textSecondary
hintColor: textTertiary
```

### Buttons

**Filled (primary action):**
```
bg: primary
fg: scaffoldBackground
borderRadius: 8px
```

**Outlined (secondary action):**
```
fg: primary
border: primaryMuted
borderRadius: 8px
compact variant: padding 20h/6v, minimumSize zero, shrinkWrap
```

**Text (tertiary / destructive):**
```
fg: primary (default)
fg: danger (destructive variant)
```

**FAB:**
```
bg: primary
fg: scaffoldBackground
```

### Bottom Sheet

```
bg: surface
borderRadius: 16px top
border: 1px border
padding: 24h, 16t, 24b
shadow: only when overlaying map (blurRadius: 12)
```

### Dialog

```
bg: surface
borderRadius: 16px
border: 1px border
titleStyle: textPrimary, bold
```

### Bottom Navigation

```
bg: scaffoldBackground
border-top: 0.5px border
selected: primary (icon + text + 3px top accent)
unselected: textSecondary
fontSize: 12
iconSize: 24
selectedWeight: w600
```

### Drawer

```
bg: surface (via theme)
header bg: scaffoldBackground
text: textPrimary
subtitle: textSecondary
avatar bg: surfaceHighlight
avatar icon: textSecondary
icon size: 24
padding: 24px horizontal
```

### Indicator Dots

```
size: 14x14
shape: circle
color: contextual (areaBorder, forbiddenAreaBorder, marker color)
```

### Loading Spinners

```
standard: 20x20, strokeWidth 2
compact: 18x18, strokeWidth 2
color: inherited from context
```

### Mode Indicator Pill (map overlay)

```
bg: scaffoldBackground at 86% opacity
borderRadius: 999px
padding: 14h, 8v
text: white, w600
```

### Action Bar (map overlay)

```
bg: surface
borderRadius: 999px
shadow: blurRadius 12, black at 25%
padding: 10h, 8v
```

---

## Icon Sizes

| Size | Usage                         |
|------|-------------------------------|
| 18   | Decorative (brand icon)       |
| 20   | Action icons (edit, close)    |
| 22   | List item avatar icon         |
| 24   | Navigation, list leading      |
| 36   | Map markers (default)         |
| 44   | Map markers (dragging), avatar|
| 48   | Empty state illustration      |
| 80   | Hero/welcome illustration     |

---

## Patterns

### Map Elements Stay Light
Map tiles are standard OSM (light). Labels, vertex borders, and midpoint borders use white/black for contrast against light tiles. Only UI chrome (panels, overlays, nav) uses the dark theme.

### Sheet Decoration (reusable)
Bottom panels that overlay the map share a `_sheetDecoration` pattern: surface background, 16px top radius, shadow for lift above map.

### Loading States
All async operations show a `CircularProgressIndicator` inside the triggering button (sized 20x20 or 18x18), never blocking the full screen.

### Danger Actions
Delete/destructive buttons use `AppColors.danger` as foreground color on a `TextButton`. Confirmation dialogs precede destructive operations.

### List Item Card (standard pattern)

All entity list screens (contacts, regions, etc.) use the same card layout:

```
Card (elevation: 0, border, borderRadius: 12)
├── InkWell (borderRadius: 12)
│   └── Padding (16h, 12v)
│       └── Row
│           ├── CircleAvatar (radius: 22, bg: surfaceHighlight)
│           │   └── Icon (size: 22, color: contextual)
│           ├── SizedBox(width: 14)
│           ├── Expanded Column
│           │   ├── Text (name, 17, w600, maxLines: 1, ellipsis)
│           │   └── Text? (subtitle, 14, textSecondary, maxLines: 1, ellipsis)
│           ├── SizedBox(width: 8)
│           └── Icon (chevron_right, textTertiary)
```

- **Avatar icon varies by entity**: `landscape_outlined` (regions), photo or initials (contacts)
- **Avatar icon color**: `primary` for generic entities, contextual for others
- **Subtitle**: first available secondary field; hidden if null/empty
- **No inline action buttons** — editing lives on the detail screen
- **Card margin**: `EdgeInsets.only(bottom: 10)` (list padding provides horizontal inset)
- **List padding**: `fromLTRB(16, 4, 16, 16)`

### List Screen Header

```
Padding (fromLTRB 16, 16, 16, 8)
└── Row (spaceBetween)
    ├── Text (screenTitle: 28, bold)
    └── TextButton.icon (create action)
```

### Empty State

```
Center
└── Column (mainAxisSize: min)
    ├── Icon (entity-specific, size: 48, textTertiary)
    ├── SizedBox(height: 12)
    ├── Text (primary message, 16, textSecondary)
    ├── SizedBox(height: 4)
    └── Text (guidance, 14, textTertiary)
```

Guidance text should nudge toward the primary action (e.g., "Create one to start mapping your areas").

### Section Header (list divider)

Used to separate sections within a single scrollable list (e.g., invitations above groups).

```
Padding (fromLTRB 0, 12, 0, 8)
└── Row
    ├── Text (title, 13, w600, textSecondary, letterSpacing: 0.8, UPPERCASE)
    └── Optional count badge
        └── Container (padding: 6h/1v, borderRadius: 8, bg: primary at 15%)
            └── Text (count, 12, w600, primary)
```

- Only show count badge when the number is meaningful (e.g., pending invitations)
- Only show section headers when multiple sections are visible — a single section needs no label

### Action Card (inline actions pattern)

Variant of List Item Card for items that require immediate action (e.g., invitations to accept/decline). Actions live inside the card instead of navigating to a detail screen.

```
Card (elevation: 0, border, borderRadius: 12)
└── Padding (16h, 12v)
    └── Column
        ├── Row (same as List Item Card, but NO chevron)
        │   ├── CircleAvatar (radius: 22, bg: surfaceHighlight)
        │   │   └── Icon (size: 22, color: primary)
        │   ├── SizedBox(width: 14)
        │   └── Expanded Column
        │       ├── Text (title, 17, w600, maxLines: 1, ellipsis)
        │       └── Text (subtitle, 14, textSecondary, maxLines: 1, ellipsis)
        ├── SizedBox(height: 10)
        └── Row (end-aligned)
            ├── OutlinedButton compact (secondary action, e.g., "Decline")
            ├── SizedBox(width: 8)
            └── FilledButton compact (primary action, e.g., "Accept")
```

- **Compact button style**: `padding: 20h/6v, minimumSize: zero, shrinkWrap`
- **Per-item loading**: track `submittingId` instead of a global boolean — only the active card shows a spinner, others stay interactive
- **Spinner replaces primary button label**: 18x18, strokeWidth 2
- **Both buttons disabled** while the item is submitting
- **Card margin**: `EdgeInsets.only(bottom: 10)` (matches List Item Card)

### Multi-Action Header

When a list screen has more than one top-level action, group them in a nested `Row`:

```
Padding (fromLTRB 16, 16, 16, 8)
└── Row (spaceBetween)
    ├── Text (screenTitle: 28, bold)
    └── Row (mainAxisSize: min)
        ├── TextButton.icon (secondary action, e.g., "Join")
        └── TextButton.icon (primary action, e.g., "New")
```

### Form Bottom Sheet (reusable)

Standard pattern for sheets that collect a single input (create group, join by code):

```
showModalBottomSheet (isScrollControlled: true, borderRadius: 16 top)
└── Padding (24 all + viewInsets.bottom)
    └── Column (mainAxisSize: min, crossAxisAlignment: stretch)
        ├── Text (sheetTitle: 20, bold)
        ├── SizedBox(height: 16)
        ├── TextField (autofocus, contextual decoration)
        ├── Optional helper text (13, textTertiary)
        ├── SizedBox(height: 24)
        └── FilledButton (action, shows 20x20 spinner when submitting)
```

- **Error display**: use `InputDecoration.errorText` on the TextField, cleared on input change
- **Use `StatefulBuilder`** when sheet needs local state (e.g., error text) alongside Riverpod state
- **Use `Consumer`** inside sheet to watch provider state for loading indicators

### External Directions (map markers)

When a map element has coordinates, offer a directions button that opens the platform's native maps app.

```
IconButton (icon: directions, size: 20, tooltip: 'Directions')
├── iOS: https://maps.apple.com/?daddr={lat},{lng}&q={label}
└── Android: https://www.google.com/maps/dir/?api=1&destination={lat},{lng}
```

- **Always visible** — not gated behind `editable` (viewing a marker ≠ needing edit permissions to navigate there)
- **Position**: before edit/close icons in the detail panel action row
- **Launch mode**: `LaunchMode.externalApplication` — always open real maps app, never in-app webview
- **Platform detection**: `Platform.isIOS` from `dart:io`
- **Uses**: `url_launcher` (`canLaunchUrl` + `launchUrl`) — same pattern as contact phone/email
