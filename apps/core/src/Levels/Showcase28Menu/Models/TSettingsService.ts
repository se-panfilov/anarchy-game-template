import type { TShowcasesGameSettings } from '@Shared';

export type TSettingsService = Readonly<{
  applyAppSettings: (appSettings: TShowcasesGameSettings) => boolean;
  isFirstRun: () => Promise<boolean>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
