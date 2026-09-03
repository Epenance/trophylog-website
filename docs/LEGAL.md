# Legal documents — source of truth

The **published Astro pages are the only source of truth** for TrophyLog's legal
copy. There is no separate Markdown draft to keep in sync.

| Document | Source file | Public URLs |
| --- | --- | --- |
| Terms of Service (supplemental to Apple's Standard EULA) | `src/pages/terms.astro` | `https://trophylog.com/terms/?lang=en` · `https://trophylog.com/terms/?lang=da` |
| Privacy Policy | `src/pages/privacy.astro` | `https://trophylog.com/privacy/?lang=en` · `https://trophylog.com/privacy/?lang=da` |
| Account deletion | `src/pages/delete-account.astro` | `https://trophylog.com/delete-account/?lang=en` · `https://trophylog.com/delete-account/?lang=da` |

Version numbers, effective dates, and stable URLs live in **`src/data/legal.ts`**
and nowhere else. The pages render them, and `/terms/version.json` publishes the
Terms descriptor for cross-checking against the backend.

## How to revise a document

1. Edit the English and Danish copy in the `.astro` page. Keep the two
   languages semantically equivalent, section by section.
2. Bump `version` in `src/data/legal.ts`. The version is an opaque, immutable
   identifier for one exact revision of the text, so *any* wording change in
   either language needs a new version.
3. Set `effectiveAt` / `effectiveDate` and, for the Terms, decide
   `requiresReacceptance` (material changes require every existing user to
   re-accept in the app; see Terms §14).
4. Have qualified Danish counsel approve the copy **before** publishing.
   Before naming a new processor (for example an external content-moderation
   provider), add it to the Privacy Policy processor list and update the
   international-transfer wording **first** — TrophyLog must not send user
   content to a provider the policy does not disclose.
5. Publish, then verify `https://trophylog.com/terms/version.json` and both
   locale URLs on a phone.
6. Only then deploy the backend "current Terms" descriptor with **exactly** the
   same `version`, `effectiveAt`, and URLs, and finally enable enforcement in
   the mobile sign-in flows.
7. Add a row to the version log below.

## Integration contract with trophylog-app

The backend descriptor and the app must use these fields verbatim from
`src/data/legal.ts` (also served at `/terms/version.json`):

| Field | Meaning |
| --- | --- |
| `version` | Opaque, immutable identifier of the published revision |
| `effectiveAt` | ISO date (`YYYY-MM-DD`) the revision takes effect |
| `urls.en` / `urls.da` | Stable locale-specific links the app opens |
| `requiresReacceptance` | Whether all existing users must re-accept |

Locale resolution on all three pages is deterministic: `?lang=en|da` in the
URL wins, then the visitor's last choice in `localStorage`, then English.

Related: [trophylog-app#198](https://github.com/Epenance/trophylog-app/issues/198)
(App Review 1.2 epic), [trophylog-website#1](https://github.com/Epenance/trophylog-website/issues/1).

## Version log

### Terms of Service

| Version | Effective | Re-accept | Summary | Legal review |
| --- | --- | --- | --- | --- |
| 2.0 | 2026-10-01 | yes | App Review 1.2 revision: explicit version; zero-tolerance acceptable-use policy; new moderation, reporting and blocking section; explicit suspension/ejection; changes section aligned with in-app re-acceptance; Stripe billing replaced by Apple App Store / Google Play in-app purchases managed via RevenueCat; stable `?lang=` links. Apple's Standard EULA now governs the iOS licence, with these Terms supplemental; decommissioned EU ODR reference removed. | **Pending** — must be approved by Danish counsel before publication |
| 1.0 | 2026-07-07 | — | Initial publication (Stripe-billed freemium model). | Not recorded |

### Privacy Policy

| Version | Effective | Summary | Legal review |
| --- | --- | --- | --- |
| 2.0 | 2026-10-01 | Stripe replaced by Apple/Google (independent controllers) and RevenueCat (processor); new "shared content & safety data" category; new moderation/reports/blocking section; retention restructured to separate private deletion, group-retained content shown as "Deleted user", backups, accounting, moderation, and ejection records; Cloudflare (R2/Workers), Bunny Stream and Resend added to the processor list. | **Pending** — must be approved by Danish counsel before publication |
| 1.0 | 2026-07-07 | Initial publication. | Not recorded |

## Version discipline while v2.0 is unpublished

Version `2.0` is still a **draft**: v1.0 is what is live. Edits to the v2.0 copy
before it ships keep the `2.0` identifier, because the version names a
*published* revision. Once v2.0 is published, any further wording change needs a
new version — see "How to revise a document" above.

## Open points for counsel (v2.0)

- Terms §7 commits to *aiming* to review reports within 24 hours, mirroring
  Apple's Guideline 1.2 expectation. Confirm the wording does not create an
  unwanted contractual SLA.
- Terms §13 refund wording for termination without cause now defers to Apple /
  Google refund policies because they are merchant of record.
- Privacy §8 retention of moderation records (2 years after closure; ejection
  records for as long as needed) is a proposal, not a legal determination.
- Confirm the effective date and whether v2.0 is a material revision requiring
  re-acceptance by all existing users (currently `requiresReacceptance: true`).
- The EU Online Dispute Resolution platform reference was removed because the
  platform is decommissioned. Confirm whether Danish law requires naming a
  replacement complaint body (for example Center for Klageløsning) in Terms §15.
- Terms §8 now relies on Apple's Standard EULA for the iOS licence. Confirm that
  App Store Connect → App Information → License Agreement is set to Apple's
  Standard License Agreement, not a custom EULA.
- Privacy §8 retention for backups (30 days) and group-retained content matches
  the backend's current behaviour; confirm the anonymisation approach (attribution
  cleared, shown as "Deleted user") satisfies the erasure right.
