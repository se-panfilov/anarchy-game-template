import type { TLocaleId } from '@hellpig/anarchy-i18n';
import type { TResolution, TGameSettings } from '@Shared';

export type TSettingsService = Readonly<{
  applyPlatformSettings: (platformSettings: TGameSettings) => boolean;
  detectResolution: () => TResolution;
  getAppSettings: () => Promise<TGameSettings>;
  getPreferredLocales: () => ReadonlyArray<TLocaleId>;
  setAppSettings: (settings: TGameSettings) => Promise<void>;
  updateAppSettings: (settings: Partial<TGameSettings>) => Promise<TGameSettings>;
}>;
