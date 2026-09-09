import type { Locale } from '../i18n/locales';

// DKK and EUR launch prices confirmed by the product owner on 9 September 2026.
// Sources and the update checklist: docs/issue-4-catalogue-review.md.
type Limit = number | 'unlimited';

interface PersonalPlan {
	id: 'free' | 'premium';
	monthlyPrice: Record<Locale, number>;
	annualPrice: Record<Locale, number>;
	hunts: Limit;
	trophies: Limit;
	storageGb: number;
	files: Limit;
	regions: Limit;
	areasPerRegion: Limit;
	markersPerRegion: Limit;
	contacts: Limit;
	companionsPerTrip: Limit;
	watermark: boolean;
}

interface GroupPlan {
	id: 'free-group' | 'konsortium-10' | 'konsortium-20' | 'konsortium-40';
	annualPrice: Record<Locale, number>;
	members: number;
	storageGb: number;
	regions: number;
	areasPerRegion: number;
	markersPerRegion: number;
	contacts: Limit;
}

export const personalPlans: readonly PersonalPlan[] = [
	{
		id: 'free',
		monthlyPrice: { en: 0, da: 0 }, annualPrice: { en: 0, da: 0 },
		hunts: 'unlimited', trophies: 'unlimited', storageGb: 5, files: 250,
		regions: 2, areasPerRegion: 'unlimited', markersPerRegion: 'unlimited',
		contacts: 10, companionsPerTrip: 2, watermark: true,
	},
	{
		id: 'premium',
		monthlyPrice: { en: 4.99, da: 39 }, annualPrice: { en: 34.99, da: 249 },
		hunts: 'unlimited', trophies: 'unlimited', storageGb: 50, files: 'unlimited',
		regions: 'unlimited', areasPerRegion: 'unlimited', markersPerRegion: 'unlimited',
		contacts: 'unlimited', companionsPerTrip: 'unlimited', watermark: false,
	},
];

export const groupPlans: readonly GroupPlan[] = [
	{ id: 'free-group', annualPrice: { en: 0, da: 0 }, members: 5, storageGb: 2, regions: 2, areasPerRegion: 25, markersPerRegion: 40, contacts: 25 },
	{ id: 'konsortium-10', annualPrice: { en: 99.99, da: 799 }, members: 10, storageGb: 25, regions: 12, areasPerRegion: 150, markersPerRegion: 315, contacts: 'unlimited' },
	{ id: 'konsortium-20', annualPrice: { en: 179.99, da: 1299 }, members: 20, storageGb: 50, regions: 32, areasPerRegion: 400, markersPerRegion: 565, contacts: 'unlimited' },
	{ id: 'konsortium-40', annualPrice: { en: 249.99, da: 1999 }, members: 40, storageGb: 100, regions: 72, areasPerRegion: 900, markersPerRegion: 1065, contacts: 'unlimited' },
];

export function formatPrice(amount: number, locale: Locale): string {
	return locale === 'da'
		? `${new Intl.NumberFormat('da-DK').format(amount)} kr.`
		: new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function formatLimit(limit: Limit, locale: Locale): string {
	return limit === 'unlimited'
		? (locale === 'da' ? 'Ubegrænset' : 'Unlimited')
		: new Intl.NumberFormat(locale === 'da' ? 'da-DK' : 'en-GB').format(limit);
}
