import { test } from '@playwright/test';
import type { Page } from 'playwright';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL: string = `http://localhost:${process.env.PORT}?path=saveLoad`;

test.use({ viewport: VIEWPORT, deviceScaleFactor: 1 });

test.beforeEach(async ({ page }) => {
  await page.goto(GAME_URL);
  await waitUntilReady('BEFORE_EACH', page);
});

test.describe('Space save/load persistence', (): void => {
  const thresholds = {
    // threshold: 0.01,
    timeout: 50000,
    maxDiffPixelRatio: 0.01
  };

  test('Plain space load', async ({ page }): Promise<void> => {
    // TODO
  });
});

export async function waitUntilReady(actionName: string, page: Page, timeout: number = 25000): Promise<void> {
  await page.waitForFunction(
    ({ actionName }): boolean | undefined => {
      console.log(`[E2E] is ${actionName} ready:  ${(window as any)._isReady}. Is Renderer ready: ${(window as any)._isRendererReady}`);
      const body: HTMLBodyElement | null = document.querySelector('body');
      const loaded: boolean = !!body?.classList.contains('ready');
      const isReady: boolean = !!(window as any)._isReady;
      const isRendererReady: boolean = !!(window as any)._isRendererReady;
      const isResourcesReady: boolean = !!(window as any)._isResourcesReady;
      const isActiveRendererReady: boolean = !!(window as any)._isActiveRendererReady;
      return loaded && isReady && isRendererReady && isResourcesReady && isActiveRendererReady;
    },
    { timeout, actionName }
  );
  await page.waitForTimeout(100);
}
