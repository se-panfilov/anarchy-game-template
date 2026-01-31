import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import { getLocaleByLocaleId, getPreferLocaleId, stringToLocaleId } from '@Anarchy/i18n';
import { buildPublicUrl, isDefined } from '@Anarchy/Shared/Utils';
import { getBrowserInfo } from '@Anarchy/Shared/Utils/DetectUtils';
import { ShowcasesFallbackLocale, GameLocales } from '@I18N';
import type { TDistName, TLegalDoc, TLoadDocPayload, TReleaseName, TGameSettings } from '@Shared';
import { DefaultGameSettings, makeDistName, makeReleaseName, sanitizeMarkDown } from '@Shared';

import type { TPlatformDriver } from '@/Models';
import { settingsWebDbService } from '@/Services/SettingsWebDbService';

export function Driver(): TPlatformDriver {
  let cachedAppSettings: TGameSettings | undefined;
  function closeApp(): void {
    throw new Error('[WEB] closeApp is not supported on this platform');
  }

  const getNodeVersion = (): string => 'N/A';

  const getPlatformVersion = (): string => 'N/A';

  const getWrappedAppVersion = (): Promise<string> => Promise.resolve(import.meta.env.__APP_VERSION__);

  const getPackagesVersions = (): Promise<Record<string, string>> => Promise.resolve(__BUILD_META_INFO__);

  async function getAppSettings(): Promise<TGameSettings> {
    const settings: TGameSettings | undefined = await settingsWebDbService.findSettings();
    if (isDefined(settings)) {
      cachedAppSettings = settings;
      return settings;
    }

    console.warn(`[WEB] Settings not found. Applying default settings.`);
    const defaultSettings: TGameSettings = await buildDefaultSettings();
    cachedAppSettings = settings;
    await setAppSettings(defaultSettings);
    return defaultSettings;
  }

  const getCachedAppSettings = (): TGameSettings | undefined => cachedAppSettings;

  function getPreferredLocales(): Promise<ReadonlyArray<TLocaleId>> {
    const navigatorLanguages: ReadonlyArray<string> = Array.isArray(navigator.languages) ? navigator.languages : [];
    const languages: ReadonlyArray<string> = isDefined(navigator.language) ? [navigator.language, ...navigatorLanguages] : navigatorLanguages;
    return Promise.resolve(Array.from(new Set(languages.map(stringToLocaleId))));
  }

  async function buildDefaultSettings(): Promise<TGameSettings> {
    const availableLocales: ReadonlyArray<TLocale> = Object.values(GameLocales);
    const availableLocalesIds: ReadonlyArray<TLocaleId> = availableLocales.map((locale: TLocale): TLocaleId => locale.id);
    const locale: TLocale = getLocaleByLocaleId(getPreferLocaleId(await getPreferredLocales(), availableLocalesIds, ShowcasesFallbackLocale.id), availableLocales);

    const platformDetectedSettings: Partial<TGameSettings> = {
      localization: {
        ...DefaultGameSettings.localization,
        locale
      }
    };

    return {
      ...DefaultGameSettings,
      ...platformDetectedSettings
    };
  }

  async function getLegalDocs({ name }: TLoadDocPayload): Promise<TLegalDoc> {
    const response: Response = await fetch(`${buildPublicUrl(import.meta.env.BASE_URL, 'legal')}/${name}.md`);

    if (!response.ok) throw new Error(`Failed to load legal doc "${name}" from ${response.url}: ${response.status} ${response.statusText}`);
    const content: string = await response.text();
    const cleanContent: string = await sanitizeMarkDown(content);
    return { name, content: cleanContent };
  }

  const restartApp = (): void => window.location.reload();

  const setFirstRun = (isFirstRun: boolean): Promise<void> => settingsWebDbService.updateSettings({ internal: { isFirstRun } });

  async function setAppSettings(settings: TGameSettings): Promise<void> {
    cachedAppSettings = settings;
    return settingsWebDbService.setSettings(settings);
  }

  const getReleaseName = (): Promise<TReleaseName> => Promise.resolve(makeReleaseName(import.meta.env.VITE_RELEASE_NAME_PREFIX, import.meta.env.__APP_VERSION__));

  const getDistName = (): Promise<TDistName> => Promise.resolve(makeDistName('web', 'web'));

  return {
    closeApp,
    getAppSettings,
    getBrowserInfo,
    getCachedAppSettings,
    getDistName,
    getLegalDocs,
    getNodeVersion,
    getPackagesVersions,
    getPlatformVersion,
    getPreferredLocales,
    getReleaseName,
    getWrappedAppVersion,
    restartApp,
    setAppSettings,
    setFirstRun
  };
}
