import type { TShowcaseLocaleIds } from '@i18n';
import type { AllowedLegalDocNames } from '@Shared/Constants';

export type TLoadDocPayload = Readonly<{
  name: AllowedLegalDocNames;
  locale?: TShowcaseLocaleIds;
}>;
