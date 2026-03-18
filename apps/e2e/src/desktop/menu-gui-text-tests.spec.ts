import type { TLaunchContext } from '@E2E/Models/TLaunchContext';
import { expect, test } from '@playwright/test';

import { launchPackagedElectronApp, waitActiveRendererReady, waitFontsReady, waitResourcesReady } from './DesktopE2eUtils';

const GAME_URL: string = `http://localhost:${process.env.PORT ?? '4173'}?path=menu`;

let context: TLaunchContext;

// Run tests in serial mode to avoid multiple Electron instances running simultaneously
test.describe.configure({ mode: 'serial' });

test.describe('Desktop app Menu/GUI text tests', () => {
  const thresholds = {
    // threshold: 0.01,
    timeout: 50000,
    maxDiffPixelRatio: 0.01
  };

  test.beforeAll(async () => {
    const { electronApp, page } = await launchPackagedElectronApp();

    context = { electronApp, page };

    await page.goto(GAME_URL);
    await page.waitForLoadState('domcontentloaded');
    // eslint-disable-next-line spellcheck/spell-checker
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('load');
    await waitFontsReady(page);
    await waitResourcesReady(page);
    await waitActiveRendererReady(page);
  });

  test.afterAll(async () => {
    if (context?.electronApp) await context.electronApp.close();
  });

  test('Open plain page', async () => {
    const { page } = context;

    await expect(page).toHaveScreenshot('plain-page.png', { ...thresholds, fullPage: true });
  });
});
