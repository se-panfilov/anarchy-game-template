import type { TGameLocaleIds } from '@I18N';
import type { AllowedLegalDocNames } from '@Shared/Constants';

export type TLoadDocPayload = Readonly<{
  name: AllowedLegalDocNames;
  locale?: TGameLocaleIds;
}>;
