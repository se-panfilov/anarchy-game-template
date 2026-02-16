import type { TFromMenuEvent, TGameSettings, TLoadDocPayload } from '@Shared';
import type { Subject } from 'rxjs';

export type TEventsEmitterService = Readonly<{
  emitCloseMenu: () => void | never;
  emitContinueGame: () => void | never;
  emitExitApp: () => void | never;
  emitGetLegalDocs: (payload: TLoadDocPayload) => void | never;
  emitGetMenuSettings: () => void | never;
  emitLoadGame: () => void | never;
  emitSetMenuSettings: (settings: TGameSettings) => void | never;
  emitStartNewGame: () => void | never;
  setFromMenuBus: (fromMenuBus$: Subject<TFromMenuEvent>) => void;
}>;
