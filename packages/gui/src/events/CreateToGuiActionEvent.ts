import type { GuiActionType } from '@GUI/constants';
import type { TToGuiActionEvent } from '@GUI/models';
import { ToGuiEvents } from '@Shared';

export function createToGuiActionEvent(type: GuiActionType, value: boolean): TToGuiActionEvent {
  return { type: ToGuiEvents.KeyAction, payload: { type, value } };
}
