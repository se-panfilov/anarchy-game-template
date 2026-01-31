import type { TTranslationService } from '@Anarchy/i18n';
import { TranslationService } from '@Anarchy/i18n';
import { InitialLocale, ShowcasesFallbackLocale } from '@I18N/Constants';
import { locales } from '@I18N/i18n';

export const showcasesTranslationService: TTranslationService = TranslationService(InitialLocale, ShowcasesFallbackLocale, locales);
