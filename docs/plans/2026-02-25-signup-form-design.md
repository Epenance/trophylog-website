# Signup Form Design

## Overview

Replace the existing CTA section with an inline signup form to collect interest and beta testers before TrophyLog's launch. Move app store badges to the footer.

## Approach

Inline form (Approach A) — embedded directly in the CTA section, no modal or multi-step flow. Vanilla JS, no dependencies. POSTs JSON to a configurable backend endpoint.

## Form Layout

**Heading:** "Be the first to know." — `--font-display`, gradient text, section heading size.

**Subheading:** "Sign up for updates and get early access when TrophyLog launches." — `--font-body`, `--text-secondary`.

**Fields (stacked, max-width ~480px, centered):**

1. **Name** — text input, placeholder "Your name"
2. **Email** — email input, placeholder "your@email.com"
3. **Beta checkbox** — checkbox + label: "I'd like to help beta test TrophyLog"

**Submit button:** "Sign up" — gold background (`--gold`), dark text, full width of form, hover state.

**Input styling:** `--surface` background, `--surface-highlight` border, `--text` color. Focus state adds gold border glow.

## Form Behavior

1. **Validation** — client-side check that name and email are filled, email format valid. Inline error text below the field in a muted warm color.
2. **Submission** — POST JSON `{ name, email, betaTester }` to a configurable endpoint URL (placeholder for now).
3. **Loading** — button text changes to "Signing up...", button disabled.
4. **Success** — form fades out, replaced with: "You're on the list!" + "We'll be in touch soon."
5. **Error** — message below form: "Something went wrong. Please try again." Button re-enables.

No external dependencies. All vanilla JS.

## App Store Badges

- **Hero section:** Remove badges entirely. Keep headline, subheading, phone mockup.
- **CTA section:** Removed (replaced by signup form).
- **Footer:** Add badges below brand/copyright, smaller and muted. Label: "Coming soon to". Links remain `#`.
