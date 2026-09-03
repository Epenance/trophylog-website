/**
 * Single source of truth for legal-document metadata.
 *
 * The values here are rendered on /terms and /privacy and published as JSON at
 * /terms/version.json. The backend "current Terms" descriptor and the mobile
 * app must use exactly these values, so change them here and nowhere else.
 *
 * `version` is an opaque, immutable identifier for one exact revision of the
 * copy. Any change to the published Terms text (in either language) must be
 * accompanied by a new `version` and, when the change is material, a new
 * `effectiveAt` and `requiresReacceptance: true`.
 */

export const SITE_ORIGIN = 'https://trophylog.com';

export type LegalLocale = 'en' | 'da';

export interface LegalDocument {
	/** Opaque revision identifier shared with the backend descriptor. */
	version: string;
	/** ISO 8601 date (YYYY-MM-DD) the revision takes effect. */
	effectiveAt: string;
	/** Human-readable effective date per locale. */
	effectiveDate: Record<LegalLocale, string>;
	/** Stable, locale-specific URLs the app can deep-link to. */
	urls: Record<LegalLocale, string>;
}

export const TERMS: LegalDocument & {
	/** Whether all existing users must explicitly re-accept this revision. */
	requiresReacceptance: boolean;
} = {
	version: '2.0',
	effectiveAt: '2026-10-01',
	effectiveDate: {
		en: '1 October 2026',
		da: '1. oktober 2026',
	},
	urls: {
		en: `${SITE_ORIGIN}/terms/?lang=en`,
		da: `${SITE_ORIGIN}/terms/?lang=da`,
	},
	requiresReacceptance: true,
};

export const PRIVACY: LegalDocument = {
	version: '2.0',
	effectiveAt: '2026-10-01',
	effectiveDate: {
		en: '1 October 2026',
		da: '1. oktober 2026',
	},
	urls: {
		en: `${SITE_ORIGIN}/privacy/?lang=en`,
		da: `${SITE_ORIGIN}/privacy/?lang=da`,
	},
};
