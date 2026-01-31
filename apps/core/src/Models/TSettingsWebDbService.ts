import type { TDeepPartial } from '@Anarchy/Shared/Utils';
import type { TGameSettings } from '@Shared';
import type { Dexie, EntityTable } from 'dexie';

export type TSettingsWebDbService = Readonly<{
  findSettings: () => Promise<TGameSettings | undefined>;
  getSettings: () => Promise<TGameSettings> | never;
  setSettings: (value: TGameSettings) => Promise<void>;
  updateSettings: (patch: TDeepPartial<TGameSettings>) => Promise<void> | never;
}>;

export type TSettingsWebDb = Dexie & Readonly<{ settings: EntityTable<TGameSettings> }>;
