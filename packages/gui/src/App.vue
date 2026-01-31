<script setup lang="ts">
import './assets/style.scss';

import { eventsListenerService } from '@GUI/services';
import Bottom from '@GUI/views/Bottom.vue';
import { vueTranslationService } from '@I18N';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

onMounted((): void => {
  appEventsSub$ = eventsListenerService.startListeningAppEvents();
});

onUnmounted((): void => {
  vueTranslationService.destroy$.next();
  appEventsSub$?.unsubscribe();
});
</script>

<template>
  <div class="gui">
    <Bottom class="gui__item -bottom" />
  </div>
</template>

<style scoped lang="scss">
.gui {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
}
</style>
