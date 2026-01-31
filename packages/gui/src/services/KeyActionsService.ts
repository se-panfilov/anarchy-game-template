import { isNotDefined } from '@Anarchy/Shared/Utils';
import { GuiActionType } from '@GUI/constants';
import type { TGuiActionPayload, TKeyActionsService } from '@GUI/models';
import { eventsEmitterService } from '@GUI/services/EventsEmitterService';
import { guiPinia } from '@GUI/stores/CreatePinia';
import { useGuiButtonStore } from '@GUI/stores/GuiButtonsStore';
import { GameLocales, vueTranslationService } from '@I18N';
import { FromGuiActionEvents, ToGuiEvents } from '@Shared';

const { Attack, Defense, MiniMap, Settings, Inventory, Language } = GuiActionType;
const { SettingsToggle } = FromGuiActionEvents;

export function KeyActionsService(): TKeyActionsService {
  function onAction(payload: TGuiActionPayload): void | never {
    if (isNotDefined(payload?.value) || isNotDefined(payload?.type)) throw new Error(`[EventsService]: Action "${ToGuiEvents.KeyAction}" has invalid payload`);
    setButtonVisuals(payload);
    performActions(payload);
  }

  function setButtonVisuals({ type, value }: TGuiActionPayload): void {
    //Pass guiPinia explicitly to avoid issues when pinia connects to different app instance (e.g. gui vs menu)
    useGuiButtonStore(guiPinia).setActiveButton(type, value);
  }

  function toggleLocale(): void {
    const newLocale = vueTranslationService.getCurrentLocale().id === GameLocales['en-US'].id ? GameLocales['nl-NL'] : GameLocales['en-US'];
    vueTranslationService.setLocale(newLocale);
  }

  function performActions({ type, value }: TGuiActionPayload): void {
    switch (type) {
      case Attack:
        // console.log('Attack', value);
        break;
      case Defense:
        // console.log('Defense', value);
        break;
      case Inventory:
        console.log('XXX Inventory', value);
        break;
      case MiniMap:
        console.log('XXX Map', value);
        break;
      case Settings:
        if (value) eventsEmitterService.emitActionEvent({ type: SettingsToggle });
        break;
      case Language:
        toggleLocale();
        break;
      default:
        throw new Error(`[KeyActionsService]: Unknown action type "${type}"`);
    }
  }

  return {
    onAction,
    performActions
  };
}

export const keyActionsService: TKeyActionsService = KeyActionsService();
