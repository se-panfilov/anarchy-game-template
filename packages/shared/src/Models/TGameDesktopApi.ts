import type { TLocaleId } from '@hellpig/anarchy-i18n';
import type { TBrowserInfo } from '@hellpig/anarchy-shared/Models';

import type { TDistName } from './TDistName';
import type { TGameSettings } from './TGameSettings';
import type { TLegalDoc } from './TLegalDoc';
import type { TLoadDocPayload } from './TLoadDocPayload';
import type { TReleaseName } from './TReleaseName';

export type TGameDesktopApi = Readonly<{
  closeApp: () => void;
  desktopAppVersion: () => Promise<string>;
  electron: () => string;
  getAppSettings: () => Promise<TGameSettings>;
  getBrowserInfo: () => TBrowserInfo;
  getDistName: () => Promise<TDistName>;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getPackagesVersions: () => Promise<Record<string, string>>;
  getPreferredLocales: () => Promise<ReadonlyArray<TLocaleId>>;
  getReleaseName: () => Promise<TReleaseName>;
  node: () => string;
  restartApp: () => void;
  setAppSettings: (settings: TGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
