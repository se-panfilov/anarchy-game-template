import path from 'node:path';

export const sharedAliases = {
  '@Showcases/E2E': path.resolve(__dirname, 'apps/e2e/src'),
  '@Showcases/Menu': path.resolve(__dirname, 'packages/menu/src'),
  '@Showcases/GUI': path.resolve(__dirname, 'packages/gui/src'),
  '@Showcases/i18n': path.resolve(__dirname, 'packages/i18n/src'),
  lodash: 'lodash-es'
};
