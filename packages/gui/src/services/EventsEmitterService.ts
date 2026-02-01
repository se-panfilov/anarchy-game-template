import { createFromGuiActionEvent } from '@GUI/events';
import type { TEventsEmitterService } from '@GUI/models';
import type { TFromGuiActionPayload } from '@GUI/models/TFromGuiActionEvent';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import type { TFromGuiEvent } from '@Shared';
import { FromGuiEvents } from '@Shared';
import type { Subject } from 'rxjs';

const { CloseGui } = FromGuiEvents;

function EventsEmitterService(): TEventsEmitterService {
  let fromGuiBus$: Subject<TFromGuiEvent> | undefined;

  const setFromGuiBus = (bus: Subject<TFromGuiEvent>): void => void (fromGuiBus$ = bus);

  const noBusError = '[EventsService]: fromGuiBus$ is not defined. Call setBus() first.';

  function emitEvent(event: TFromGuiEvent): void | never {
    if (isNotDefined(fromGuiBus$)) throw new Error(noBusError);
    return fromGuiBus$.next(event);
  }

  const emitActionEvent = (payload: TFromGuiActionPayload): void => emitEvent(createFromGuiActionEvent(payload));
  const emitCloseGui = (): void => emitEvent({ type: CloseGui });

  return {
    emitActionEvent,
    emitCloseGui,
    emitEvent,
    setFromGuiBus
  };
}

export const eventsEmitterService: TEventsEmitterService = EventsEmitterService();
