import type { TTranslationService } from '@hellpig/anarchy-i18n';
import { TranslationService } from '@hellpig/anarchy-i18n';
import { GameFallbackLocale, InitialLocale } from '@I18N/Constants';
import { locales } from '@I18N/i18n';

export const gameTranslationService: TTranslationService = TranslationService(InitialLocale, GameFallbackLocale, locales);
