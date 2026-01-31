import type { TFromGuiActionPayload } from '@GUI/models/TFromGuiActionEvent';
import type { TFromGuiEvent } from '@Shared';
import type { Subject } from 'rxjs';

export type TEventsEmitterService = Readonly<{
  emitActionEvent: (payload: TFromGuiActionPayload) => void;
  emitCloseGui: () => void;
  emitEvent: (event: TFromGuiEvent) => void | never;
  setFromGuiBus: (fromGuiBus$: Subject<TFromGuiEvent>) => void;
}>;
