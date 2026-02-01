import type { GuiActionType } from '@GUI/constants';
import type { MouseButtonValue, TGameKey } from '@hellpig/anarchy-engine';
import type { FunctionalComponent } from 'vue';

export type TGuiButtonStoreState = Readonly<{
  [key in GuiActionType]: TGuiButtonState;
}>;

export type TGuiButtonState = {
  id: GuiActionType;
  isVisible: boolean;
  isActive: boolean;
  i18n: string;
  key: TGameKey | MouseButtonValue | undefined;
  icon: FunctionalComponent;
};
