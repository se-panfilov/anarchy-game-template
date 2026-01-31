import type { TNavOption } from '@Shared';
import type { ShallowRef } from 'vue';

export type TVueNavOption = Omit<TNavOption, 'label'> & {
  label: string | ShallowRef<string>;
};
