import type { TGameSettings, TLegalDoc, TLoadDocPayload } from '@Shared';

export type TMainMenuService = Readonly<{
  closeApp: () => void;
  closeMainMenu: () => void | never;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getSettings: () => Promise<TGameSettings>;
  isMenuActive: () => boolean;
  openMainMenu: () => void | never;
  restartApp: () => void;
  setSettings: (settings: TGameSettings) => Promise<void>;
}>;
