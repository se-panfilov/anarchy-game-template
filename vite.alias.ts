import path from 'node:path';

export const sharedAliases = {
  '@E2E': path.resolve(__dirname, 'apps/e2e/src'),
  '@Menu': path.resolve(__dirname, 'packages/menu/src'),
  '@GUI': path.resolve(__dirname, 'packages/gui/src'),
  '@I18N': path.resolve(__dirname, 'packages/i18n/src'),
  lodash: 'lodash-es'
};
