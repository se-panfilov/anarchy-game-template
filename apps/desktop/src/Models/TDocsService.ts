import type { TLegalDoc, TLoadDocPayload } from '@Shared';

export type TDocsService = Readonly<{
  get: (payload: TLoadDocPayload) => Promise<TLegalDoc>;
}>;
