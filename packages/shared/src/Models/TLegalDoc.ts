import type { AllowedLegalDocNames } from '@Shared/Constants';

export type TLegalDoc = Readonly<{
  name: AllowedLegalDocNames;
  content: string;
}>;
