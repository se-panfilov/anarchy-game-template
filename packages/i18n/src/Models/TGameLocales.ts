import type { TLocale } from '@hellpig/anarchy-i18n';

import type { TFullLocaleIds, TGameLocaleIds } from './TGameLocaleIds';

//Locale with enforced font property
export type TLocaleWithFont = Omit<TLocale, 'font'> & Readonly<{ font: string }>;

export type TGameLocales = Record<TGameLocaleIds, TLocaleWithFont>;
export type TFullLocales = Record<TFullLocaleIds, TLocaleWithFont>;
