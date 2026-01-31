import path from 'node:path';

export const sharedAliases = {
  '@Showcases/E2E': path.resolve(__dirname, 'apps/e2e/src'),
  '@Anarchy/Engine': path.resolve(__dirname, 'packages/anarchy-engine/src'),
  '@Showcases/Menu': path.resolve(__dirname, 'packages/menu/src'),
  '@Showcases/GUI': path.resolve(__dirname, 'packages/gui/src'),
  '@Anarchy/Shared': path.resolve(__dirname, 'packages/anarchy-shared/src'),
  '@Anarchy/Tracking': path.resolve(__dirname, 'packages/anarchy-tracking/src'),
  '@Anarchy/i18n': path.resolve(__dirname, 'packages/anarchy-i18n/src'),
  '@Showcases/i18n': path.resolve(__dirname, 'packages/i18n/src'),
  lodash: 'lodash-es'
};
