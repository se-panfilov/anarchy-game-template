import type { TLocaleId } from '@hellpig/anarchy-i18n';
import type { TBrowserInfo } from '@hellpig/anarchy-shared/Models';
import type { TDistName, TGameSettings, TLegalDoc, TLoadDocPayload, TReleaseName } from '@Shared';

export type TPlatformDriver = Readonly<{
  closeApp: () => void;
  getAppSettings: () => Promise<TGameSettings>;
  getBrowserInfo: () => TBrowserInfo;
  getCachedAppSettings: () => TGameSettings | undefined;
  getDistName: () => Promise<TDistName>; //DistName is something like "darwin-arm64" (`${process.platform}-${process.arch}`)
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getNodeVersion: () => string;
  getPackagesVersions: () => Promise<Record<string, string>>;
  getPlatformVersion: () => string;
  getPreferredLocales: () => Promise<ReadonlyArray<TLocaleId>>;
  getReleaseName: () => Promise<TReleaseName>; //Release name is something like "desktop@1.0.0" (`{name}@{version}`)
  getWrappedAppVersion: () => Promise<string>;
  restartApp: (args?: ReadonlyArray<string>) => void;
  setAppSettings: (settings: TGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
