import type { TGameSettings } from '@Shared';

export type TSettingsService = Readonly<{
  applyAppSettings: (appSettings: TGameSettings) => boolean;
  isFirstRun: () => Promise<boolean>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
