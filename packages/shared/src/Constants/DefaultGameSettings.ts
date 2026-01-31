import { InitialLocale } from '@I18N';
import type { TGameSettings } from '@Shared/Models';

export const DefaultGameSettings: TGameSettings = {
  graphics: {
    // isFullScreen: false,
    // resolution: { width: 800, height: 600 }
    brightness: 50,
    contrast: 50
  },
  audio: {
    masterVolume: 80
  },
  localization: {
    locale: InitialLocale
  },
  debug: {
    isDebugMode: false
  },
  internal: {
    isFirstRun: true
  }
};
