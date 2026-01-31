<script setup lang="ts">
import type { TLocale } from '@hellpig/anarchy-i18n';
import type { TGameLocaleIds } from '@I18N';
import { GameLocales } from '@I18N';
import Dropdown from '@Menu/components/Dropdown.vue';
import Navigation from '@Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import ViewForm from '@Menu/components/ViewForm.vue';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TDropdownOption } from '@Shared';
import type { ComputedRef } from 'vue';
import { computed, reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const settingsStore = useSettingsStore();

type TLocalizationState = { locale: TGameLocaleIds };
const state: TLocalizationState = reactive({
  locale: settingsStore.localization.locale.id as TGameLocaleIds
});

function reset(): void {
  state.locale = settingsStore.localization.locale.id as TGameLocaleIds;
  emit('reset');
}

function save({ locale }: TLocalizationState): void {
  settingsStore.setLocaleById(locale);
  emit('save');
}

const options: ComputedRef<ReadonlyArray<TDropdownOption<TGameLocaleIds>>> = computed((): ReadonlyArray<TDropdownOption<TGameLocaleIds>> => {
  return Object.values(GameLocales).map((locale: TLocale) => {
    const label: string = `${locale.nativeName} (${locale.englishName}, ${locale.id})`;
    return { value: locale.id as TGameLocaleIds, label };
  });
});
</script>

<template>
  <View class="localization" :title="$t('main-menu.settings.localization.view.title')">
    <ViewForm name="localization" class="localization__view-form" @submit="save(state)">
      <SettingsGroup :title="$t('main-menu.settings.localization.group.main-localization-settings.title')">
        <Dropdown v-model="state.locale" :options="options" class="localization__setting -languages" :label="$t('main-menu.settings.localization.language.label')" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
