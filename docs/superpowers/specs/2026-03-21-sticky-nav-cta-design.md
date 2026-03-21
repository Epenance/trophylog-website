# Sticky Nav CTA — Design Spec

## Summary

Show a "Join the waitlist" button in the fixed nav bar when the hero CTA scrolls out of view. Clicking it smooth-scrolls to the signup form.

## Behavior

- An `IntersectionObserver` watches the hero CTA button (`.hero-cta`).
- When the hero CTA leaves the viewport (not intersecting), the nav CTA fades in.
- When the hero CTA re-enters the viewport (scrolling back up), the nav CTA fades out.
- Clicking the nav CTA smooth-scrolls to `#signup` via `document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })` with `e.preventDefault()` on the click handler (the `href="#signup"` is a fallback for no-JS).
- If the signup form has already been submitted (success state visible), clicking the nav CTA still scrolls to `#signup` where the success message is shown. No special handling needed.

## Markup

Add a link element inside `.nav-inner`:

```html
<a href="#signup" class="nav-cta" id="nav-cta" aria-hidden="true" tabindex="-1">Join the waitlist</a>
```

Hidden from accessibility tree by default. JS toggles `aria-hidden` and `tabindex` alongside the `.visible` class.

## Styling

- `.nav-inner` gains `display: flex; align-items: center` — this is a modification to existing CSS (currently a plain block wrapper).
- Nav CTA uses `margin-left: auto` to push it to the right side.
- Ghost button: `border: 1.5px solid var(--gold)`, `color: var(--gold)`, `border-radius: 10px` (matches `.hero-cta` and form inputs).
- Font: `var(--font-body)`, 13px, weight 600, `letter-spacing: 0.02em`.
- Padding: `10px 24px`.
- Hover: `background: var(--gold)`, `color: var(--bg)`.
- Active: `transform: translateY(0)` (matches `.hero-cta` active state).
- Transition (base): `opacity 0.25s ease, transform 0.25s ease, background 0.2s ease, color 0.2s ease`.
- Hidden by default: `opacity: 0; pointer-events: none; transform: translateY(-4px)`.
- Visible state (class `.visible`): `opacity: 1; pointer-events: auto; transform: translateY(0)`.
- `@media (prefers-reduced-motion: reduce)`: `transition: none; transform: none`.

## JavaScript

Add to the existing `<script>` block in `index.astro`:

```js
const heroCta = document.querySelector('.hero-cta');
const navCta = document.getElementById('nav-cta');

if (heroCta && navCta) {
  const ctaObserver = new IntersectionObserver(
    ([entry]) => {
      const show = !entry.isIntersecting;
      navCta.classList.toggle('visible', show);
      navCta.setAttribute('aria-hidden', String(!show));
      navCta.setAttribute('tabindex', show ? '0' : '-1');
    },
    { threshold: 0 }
  );
  ctaObserver.observe(heroCta);

  navCta.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  });
}
```

## Responsive

- On mobile (≤640px): smaller padding (`8px 18px`), font-size `12px`.
- Tablet (641–900px): no changes needed — the default nav CTA styling works at these widths.

## Files Modified

- `src/pages/index.astro` — nav markup, nav CSS (`.nav-inner` becomes flex), new `.nav-cta` CSS, and script additions.

## Out of Scope

- No inline form in the nav.
- No separate component needed.
