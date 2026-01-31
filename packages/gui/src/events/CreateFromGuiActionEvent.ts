import type { TFromGuiActionEvent, TFromGuiActionPayload } from '@GUI/models/TFromGuiActionEvent';
import { FromGuiEvents } from '@Shared';

export function createFromGuiActionEvent(payload: TFromGuiActionPayload): TFromGuiActionEvent {
  return { type: FromGuiEvents.Action, payload };
}
