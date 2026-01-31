import type { GuiActionType } from '@GUI/constants';
import type { TToGuiEvent } from '@Shared';

export type TToGuiActionEvent = Omit<TToGuiEvent, 'payload'> &
  Readonly<{
    payload: TGuiActionPayload;
  }>;

export type TGuiActionPayload = Readonly<{
  type: GuiActionType;
  value: boolean;
}>;
