# Delete Account Page — Design

**Date:** 2026-07-11
**Route:** `/delete-account` (public, no auth)
**Purpose:** Google Play data-deletion policy requires a web-accessible way to delete a TrophyLog account without the app. The backend API exists; this page is the form UI. Apple-required in-app deletion already ships (Settings → Danger zone) and is mentioned as an alternative.

## Architecture

Single standalone Astro page `src/pages/delete-account.astro` built on `Layout.astro`, visually matching `LegalLayout.astro` (nav, legal-style header, EN/DA toggle, footer) but self-contained because the page centers on an interactive form rather than prose slots. One DOM copy of the form; bilingual copy via the existing `lang-en`/`lang-da` class mechanism (hide the inactive language so elements keep natural display). Language preference shares the `trophylog-legal-lang` localStorage key used by the legal pages.

All API calls go directly from the browser to `https://api.trophylog.com/api/v1` (single `API_BASE` constant in the page script — no env/config plumbing). The backend allowlists the marketing-site origin for CORS.

## API contract (already deployed backend — consume only)

- `POST {API_BASE}/account-deletion/request` body `{email}` → always `202 {}` (anti-enumeration: UI must never state whether an account exists). `400` NestJS shape on malformed payload. `429` at 5 req/hour/IP.
- `POST {API_BASE}/account-deletion/confirm` body `{email, code}` (6 digits) → `200 {purgeDate: "YYYY-MM-DD"}`; `400 "Invalid or expired code"` for every failure cause (by design, surface as-is); `429` same throttle, separate bucket.
- Codes: 6 digits, 15-minute expiry, single-use; a new request invalidates prior codes.

**Deployment note (2026-07-11):** the routes 404'd earlier in the day; as of ~13:11 UTC both are live and match the contract exactly (`202 {}` / `400 "Invalid or expired code"`, `x-ratelimit-limit: 5` with separate buckets, ACAO for `https://trophylog.com`). Remaining checks: browser CORS from the deployed site origin, and the real happy-path test with a throwaway account (only when instructed).

## Flow / states

In-memory state machine: `email` → `code` → `success`. Email and code live only in form state — never persisted client-side.

1. **Email step:** email input + submit. Client-side format validation first (avoids burning the throttle). On `202`, advance and show neutral copy: "If an account exists for this email, we've sent a 6-digit code. It expires in 15 minutes."
2. **Code step:** 6-digit input (`inputmode=numeric`, `autocomplete=one-time-code`, digits filtered), confirm disabled until 6 digits. "Resend code" re-calls step 1 with hint that it invalidates the previous code. "Use a different email" returns to step 1.
3. **Success step:** account deactivated now, permanently deleted on **{purgeDate}** (locale-formatted from response); logging in before that date cancels deletion; subscriptions cancelled immediately, not refunded/restored; group-shared content (hunts, trophies, bookings, shared photos) stays with the group as "Deleted user"; everything else is permanently erased.

Error mapping: `400` on confirm → inline generic "Invalid or expired code"; `429` → "Too many attempts — please try again later"; network failure → retry message. Dynamic messages re-render on language switch.

## Static content on the page

- Intro explaining the flow, plus a note that deletion is also available in the app under Settings → Danger zone.
- "What gets deleted / what is retained" section using the success-state bullets (Play policy data-handling clarity).

## Localization

Full Danish alongside English. Approved Danish app copy reused: "Din konto deaktiveres med det samme…", "Aktive abonnementer opsiges med det samme…", "Jagter, trofæer og bookinger, du har delt med grupper, bevares og vises som 'Slettet bruger'." Success state substitutes the concrete purge date from the API where the app copy says "efter 30 dage".

## Accessibility

Labels on inputs, `aria-live` status/error regions, focus moves to the code input on advance and to the success heading on completion, lang toggle uses `aria-pressed` (same pattern as legal pages).

## Testing

No test infra exists in this repo (static marketing site); verification is browser-driven: render without cookies/auth, exercise all states with a fetch mock while production routes are missing, confirm no console/CORS errors from page code, screenshots of each state, language toggle check.
