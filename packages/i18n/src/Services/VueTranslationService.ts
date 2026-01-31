import type { TLocale } from '@hellpig/anarchy-i18n';
import { isDefined, isNotDefined } from '@hellpig/anarchy-shared/Utils';
import type { TVueTranslationService } from '@I18N';
import type { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
import type { I18n } from 'vue-i18n';

import { gameTranslationService } from './GameTranslationService';

export function VueTranslationService(): TVueTranslationService {
  let localeSub: Subscription;

  const isReadyPromise: Promise<void> = new Promise<void>((resolve, reject): void => {
    const subscription$: Subscription = gameTranslationService.ready$.pipe(filter((isReady: boolean): boolean => isReady)).subscribe({
      next: (): void => {
        subscription$.unsubscribe();
        return resolve();
      },
      error: (error: Error): void => {
        subscription$.unsubscribe();
        reject(error);
      }
    });
  });

  //Make sure that the default and fallback locales are loaded before the app starts
  const waitInitialReady = async (): Promise<void> => isReadyPromise;

  function toRef(obs$: Observable<string>): ShallowRef<string> {
    const ref: ShallowRef<string> = shallowRef<string>('');
    let sub: Subscription | undefined;

    onMounted((): void => {
      // eslint-disable-next-line functional/immutable-data
      sub = obs$.subscribe((value: string): void => void (ref.value = value));
    });

    onBeforeUnmount((): void => sub?.unsubscribe());

    return ref;
  }

  function connectVueI18n(i18n: I18n): void {
    localeSub = gameTranslationService.locale$.subscribe(({ id: localeId }: TLocale): void => {
      // eslint-disable-next-line functional/immutable-data
      if (i18n.mode === 'legacy') i18n.global.locale = localeId;
      // eslint-disable-next-line functional/immutable-data
      else (i18n.global.locale as any).value = localeId;

      const messages = gameTranslationService.getCurrentMessages();
      if (isDefined(messages)) i18n.global.setLocaleMessage(localeId, messages);
      if (isNotDefined(messages)) console.error(`[VueTranslationService]: Cannot load messages for vue-i18n for locale "${localeId}"`);
    });
  }

  const destroySub$: Subscription = gameTranslationService.destroy$.subscribe(() => {
    destroySub$.unsubscribe();
    localeSub?.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(gameTranslationService, { waitInitialReady, toRef, connectVueI18n });
}

export const vueTranslationService: TVueTranslationService = VueTranslationService();
