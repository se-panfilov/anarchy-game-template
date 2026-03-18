import { toBool } from '@hellpig/anarchy-shared/Utils';
import { nullish, object, string } from 'valibot';

export const runtimeSchema = object({
  VITE_APP_SHOW_DEBUG_INFO: toBool,
  VITE_SENTRY_DSN: nullish(string()),
  VITE_RELEASE_NAME_PREFIX: string(),
  VITE_DIST_NAME: nullish(string())
});
