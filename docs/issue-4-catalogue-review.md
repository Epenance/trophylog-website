# Homepage catalogue and feature review — 9 September 2026

Implements [website issue #4](https://github.com/Epenance/trophylog-website/issues/4).
Website base: `ab3e9c6` on `main`. Prices and all published limits now live in
`src/data/plans.ts`; pricing cards, group comparison, companion copy and FAQ use
that definition. A shared `src/components/HomePage.astro` renders Danish at `/`
and English at `/en/`, using typed copy in `src/i18n/home.ts`. Both retain the
existing visual style.

## Commercial source and availability

- Danish prices are the product owner's confirmed values in issue #4. The owner
  subsequently supplied the EUR launch catalogue and requested EUR on English
  pages and DKK on Danish pages. These are fixed confirmed prices, not conversions:

  | Plan | English (EUR) | Danish (DKK) |
  | --- | --- | --- |
  | Personal Free / Gratis | €0.00 | 0 kr. |
  | Premium monthly | €4.99 / month | 39 kr. / måned |
  | Premium annually | €34.99 / year | 249 kr. / år |
  | Free group / Gratis gruppe | €0.00 | 0 kr. |
  | The Camp (10 total members) | €99.99 / group / year | 799 kr. / gruppe / år |
  | The Lodge (20 total members) | €179.99 / group / year | 1.299 kr. / gruppe / år |
  | The Estate (40 total members) | €249.99 / group / year | 1.999 kr. / gruppe / år |

- The owner approved **The Camp**, **The Lodge** and **The Estate** as the final
  group-package names. The names are consistent across both languages, with
  localized member capacities directly on each card. These map to the original
  Konsortium 10/20/40 catalogue IDs. The FAQ explains that totals count the owner
  and five base places, and are not extra seats on top.
- The landing page says TrophyLog is coming soon and retains the beta signup.
  There are no store download links and signup does not start a subscription.
- Limits were cross-checked against `DEFAULT_PERSONAL_LIMITS`,
  `DEFAULT_GROUP_PLAN`, `GROUP_PACK_CONFIG` and `calculateGroupLimits` in
  [shared-types.ts at app catalogue commit 867e7629](https://github.com/Epenance/trophylog-app/blob/867e762985f4edbbc1bc1daab99fef2976e3e691/libs/shared-types/src/lib/shared-types.ts),
  plus the [catalogue migration](https://github.com/Epenance/trophylog-app/blob/867e762985f4edbbc1bc1daab99fef2976e3e691/apps/backend/migrations/1753000000000-RevenueCatIapCatalogue.ts).
  The subsequent app `origin/main` changes inspected through `d2878ea5` do not
  change these catalogue values or the reviewed import/scoring features.
- No live database overrides or unpublished store catalogue were inspected.
  No discrepancy was found in the available sources. If production limits are
  overridden, reconcile them with the owner-confirmed catalogue before publishing.
- Purchase wording follows the existing Terms §4. Legal copy and version
  descriptors are unchanged. Legal-layout changes fix a TypeScript guard and make
  the logo/Home links return to the homepage in the resolved language.

## Feature evidence and copy decisions

Paths below are in `Epenance/trophylog-app` at `867e7629`, unless stated otherwise.
This source review does not verify production runtime behavior.

| Claim | Evidence | Homepage decision |
| --- | --- | --- |
| Unlimited personal hunts and trophies | `libs/shared-types/src/lib/shared-types.ts`, `DEFAULT_PERSONAL_LIMITS` (`maxTrips` and `maxTrophies` are `-1` for both tiers) | Clearly included in Free and Premium. |
| Premium benefits | Same defaults: 50 GB, no separate file cap, unlimited regions/contacts/companions, watermark disabled | Storage ceiling explicitly retained; removed the retired Pro plan and replaced the outdated prices with the owner-confirmed EUR/DKK catalogue. |
| Group packs and free group | Same file: group defaults, pack definitions and limit calculation | Each card shows total annual price, total members including owner, shared storage and the remaining limits. Free group is a continuing option, not a paid-pack trial. |
| Personal companions | Same defaults: Free 2, Premium `-1`; `apps/backend/src/subscription/guards/companion-limit.guard.ts` | Replaced the unqualified ten-shooter claim with plan-specific companion limits. Distinguished companions from group members. |
| Offline hunt and trophy recording | `apps/mobile/lib/features/hunts/data/repositories/hunt_repository.dart` and `trophy_repository.dart`, local writes and sync queues | Retained offline recording and later sync. Removed blanket offline/group promises. |
| Booking and shared grounds | `apps/mobile/lib/features/bookings/data/repositories/booking_repository.dart` documents online-only arbitration; app `CLAUDE.md` booking/permission rules | Explicitly available in free groups within capacity/permissions. Booking requires a connection; paid packs expand capacity. |
| CIC, B&C and SCI scoring | `apps/mobile/lib/features/hunts/presentation/screens/add_score_screen.dart`; `domain/worksheets/worksheet_registry.dart` registers six worksheets | Retained score recording; qualified guided worksheets as available for supported species. No universal species coverage or official certification claim. |
| PDF export | No export flow found in mobile routes, dependencies or mobile/backend feature implementation searches | Removed the PDF export claim; absence of evidence is not asserted as a permanent product limitation. |
| CSV hunt/trophy import | Import routes and implementation expose media import and device-contact import, not a verified CSV log importer | Removed the CSV claim. |
| Photo/video import | `apps/mobile/lib/features/import/presentation/widgets/import_action_step.dart` offers new/existing hunt or trophy actions; `screens/import_media_screen.dart` routes media into creation wizards | Retained the supported media-to-entry workflow, with storage/file limits. |
| Handwriting recognition | No verified transcription implementation found in the reviewed import flow | Removed “this spring”; states no confirmed release date for automatic transcription. |
| Past entries | Hunt and trophy form date pickers allow earlier dates, with bounded date ranges | Retained manual past entries; removed “any date”. |
| Weather | Weather feature and hunt form expose location-based weather and recorded weather conditions | Uses conservative “check the weather” wording; removed unqualified GPS auto-fill, sun/moon and entry-speed claims. |
| QR links | `apps/backend/src/qr-codes/qr-codes.service.ts` has attachment/resolution for hunts and trophies | Retained QR linking. Plaque is labelled a concept; no physical sale, inclusion, confirmed price or release date is promised. Metadata no longer promotes physical medals as available. |
| Privacy | Existing Terms and Privacy pages allow user-controlled group/public/unlisted sharing | Replaced the absolute “Never” and broad hosting/tracker assertions with private-by-default and explicit sharing choices. |
| Beta availability | Existing waitlist controller/service and the owner's availability confirmation | Uses “coming soon” without a launch date. Removed Spring 2026, 1,400+ signups and monthly admissions numbers. Navigation, form, success/error states and pricing CTAs consistently describe a beta signup. |

## Language behavior

- Both homepages contain their complete text and currency at build time; no
  browser redirect or client translation is needed. The EN/DA links preserve the
  current section when JavaScript is available and still work as ordinary links
  without it.
- Headings, chapter copy, pricing, FAQ, beta form states, image alternatives,
  carousel controls, footer and page metadata are localized. Approved package
  names remain the same in both languages. Existing app screenshot assets are
  shared by both pages.
- Each homepage has its own canonical URL, reciprocal `en`/`da` alternate links,
  and Danish as `x-default` for the initial launch in Denmark. The root homepage
  has `lang="da"` immediately, including without JavaScript. The previous `/da/`
  preview URL redirects to `/`.
- Legal links specify `?lang=en|da`; returning via the legal logo or Home button
  retains that language. Legal terms, privacy text and version metadata are not
  changed by this localization.

## Verification

- Baseline `npm run build` passed before changes. Browser inspection reproduced
  the old Pro card and the absence of DKK pricing/group plans.
- `npm exec --yes --package=@astrojs/check -- astro-check` checks all Astro/TypeScript files. Two pre-existing
  errors surfaced: an untyped slider wrapper in a keyboard listener and the
  legal-language guard rejecting `undefined`. Both received type-only fixes.
  The checker runs from the package cache; package manifests and lockfile are
  unchanged.
- Final Astro check: **0 errors, 0 warnings, 0 hints** across
  19 files. `npm exec tsc -- --noEmit` and `git diff --check` also pass.
- Restored the exact locked dependencies with `npm ci`, then ran
  `npm run build`: **passed**, generating five content pages, the `/da/` redirect,
  and the Terms descriptor.
- Tested the production preview with Playwright in **Chromium and WebKit** at
  **320, 375, 768, 1024 and 1440 px**. All six cards in both languages have the
  confirmed prices and limits. Checked no horizontal overflow in pricing, FAQ,
  navigation, signup, hero and chapter headings; every FAQ opens/closes with
  Enter/Space and its complete answer remains visible. Desktop and mobile
  screenshots were visually reviewed. The hero title and small metadata now fit
  narrow screens, and the floating beta button hides when signup enters view so
  it cannot cover the longer Danish form.
- All six pricing CTAs reach the signup section via keyboard. Signup validation,
  success, rate limiting (429) and server failure (500) pass with network requests
  mocked; no real waitlist signup was sent. Language switching preserves the
  pricing section; homepage language, canonical and alternate metadata match each
  route. Legal links return 200, both legal pages retain the language on returning
  home, and booking slider keyboard controls work. Neither browser reports a page
  script error on the production build.
- After making Danish the default, rechecked both routes in Chromium and WebKit:
  `/` serves Danish even with an English browser language and JavaScript disabled;
  `/en/` serves English; `/da/` redirects home. Currency, canonical/alternate links,
  language switching and legal-page return links all match the new routes.
- Search of publishable source/assets found no retired Pro plan or superseded euro prices,
  expired spring promise, unverified signup/admission counts, PDF/CSV export/import
  promises, or blanket unlimited/offline claims.
- Independent code review verified Danish/English semantic equivalence and caught
  the legal-page Home links resetting Danish visitors to English; those links are
  corrected. This website has no configured lint or automated test
  target; validation used the build, Astro/TypeScript diagnostics and the browser.

## Updating the catalogue later

1. Confirm prices, store availability and any production limit overrides with
   the product owner. Update `src/data/plans.ts` once for the whole homepage.
2. Update both language dictionaries in `src/i18n/home.ts` together. Review
   accompanying descriptions, FAQ and feature claims if capabilities change. Keep personal and group capacity separate and state billing periods.
3. Run `npm run build`, inspect the generated page, and test at narrow mobile,
   tablet and desktop widths. Exercise every FAQ with Enter/Space, pricing links,
   and signup validation/success/failure with the request mocked.
4. Add approved store links only when that platform's actual listing is confirmed.
   For legal wording changes, follow `docs/LEGAL.md`.
