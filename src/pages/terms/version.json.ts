import type { APIRoute } from 'astro';
import { TERMS } from '../../data/legal';

/**
 * Machine-readable descriptor for the currently published Terms revision.
 * Served at /terms/version.json so the backend descriptor and the app can be
 * verified against the live site. Keep the shape stable.
 */
export const GET: APIRoute = () => {
	const body = {
		document: 'terms',
		version: TERMS.version,
		effectiveAt: TERMS.effectiveAt,
		requiresReacceptance: TERMS.requiresReacceptance,
		urls: TERMS.urls,
	};
	return new Response(JSON.stringify(body, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=300',
		},
	});
};
