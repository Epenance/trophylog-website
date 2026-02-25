# Hero CTA Button Design

## Overview

Add a "Join the waitlist" button in the hero section that smooth-scrolls to the signup form.

## Design

A gold outlined/ghost button placed below the hero subtitle (where app store badges used to be). On click, smooth-scrolls to `#signup`.

- **Text:** "Join the waitlist"
- **Style:** Gold border, transparent background, gold text. Differentiates from the solid gold submit button on the form.
- **Behavior:** Anchor tag linking to `#signup`. Uses existing `scroll-behavior: smooth` on html — no extra JS.
- **Placement:** Below `.hero-sub`, inside `.hero-content`.
