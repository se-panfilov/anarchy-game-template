import type { TLocale, TLocaleId } from '@hellpig/anarchy-i18n';
import type { TDeepWriteable } from '@hellpig/anarchy-shared/Utils';
import type { TGameLocaleIds } from '@I18N';
import { GameLocales, vueTranslationService } from '@I18N';
import type { TAudioSettings, TDebugSettings, TGameSettings, TGraphicsSettings, TInternalSettings, TLocalizationSettings } from '@Shared';
import { DefaultGameSettings } from '@Shared';
import { defineStore } from 'pinia';
import type { ComputedRef } from 'vue';
import { computed, reactive, watch } from 'vue';

export const useSettingsStore = defineStore('settingsStore', () => {
  const state: TDeepWriteable<TGameSettings> = reactive({
    ...DefaultGameSettings
  });

  const onLocaleChanged = (nextLocale: TLocale): Promise<void> => vueTranslationService.setLocale(nextLocale);

  watch(
    () => state.localization.locale.id,
    (_nextId: TLocaleId): void => {
      onLocaleChanged(state.localization.locale);
    },
    {
      flush: 'post' // Effect after commit of reactive events
      // immediate: true // Execute immediately on first run
    }
  );

  const graphics: ComputedRef<TGraphicsSettings> = computed((): TGraphicsSettings => state.graphics);
  const audio: ComputedRef<TAudioSettings> = computed((): TAudioSettings => state.audio);
  const localization: ComputedRef<TLocalizationSettings> = computed((): TLocalizationSettings => state.localization);
  const debug: ComputedRef<TDebugSettings> = computed((): TDebugSettings => state.debug);
  const internal: ComputedRef<TInternalSettings> = computed((): TInternalSettings => state.internal);

  const setGraphics = (newGraphics: Partial<TGraphicsSettings>): void => void Object.assign(state.graphics, { ...newGraphics });
  const setAudio = (newAudio: Partial<TAudioSettings>): void => void Object.assign(state.audio, { ...newAudio });
  const setLocalization = (newLocalization: Partial<TLocalizationSettings>): void => void Object.assign(state.localization, { ...newLocalization });
  function setLocaleById(id: TGameLocaleIds): void | never {
    const newLocale = GameLocales[id];
    if (!newLocale) throw new Error(`[Settings store] Locale with id "${id}" not found in ShowcasesLocales`);
    setLocalization({ locale: newLocale });
  }
  const setDebug = (newDebug: Partial<TDebugSettings>): void => void Object.assign(state.debug, { ...newDebug });
  const setInternal = (newInternal: Partial<TInternalSettings>): void => void Object.assign(state.internal, { ...newInternal });
  const setState = (newState: Partial<TGameSettings>): void => void Object.assign(state, { ...newState });

  const getLocaleId: ComputedRef<TGameLocaleIds> = computed(() => state.localization.locale.id as TGameLocaleIds);

  return {
    state: computed(() => state),
    setState,
    graphics,
    setGraphics,
    audio,
    setAudio,
    localization,
    setLocalization,
    setLocaleById,
    getLocaleId,
    debug,
    setDebug,
    internal,
    setInternal
  };
});
