import type { TDeepPartial } from '@Anarchy/Shared/Utils';
import { isNotDefined, patchObject } from '@Anarchy/Shared/Utils';
import type { TGameSettings } from '@Shared';
import { isPartialSettings } from '@Shared';

import { SettingsId, SettingsWebDbVersion } from '@/Constants';
import type { TSettingsWebDb, TSettingsWebDbService, TWebDbService } from '@/Models';

import { WebDbService } from './WebDbService';

export function SettingsWebDbService(): TSettingsWebDbService {
  const webDb: TWebDbService = WebDbService();
  const dbName: string = 'SettingsWebDb';
  const db: TSettingsWebDb = webDb.createDb(dbName);
  const id = SettingsId;

  db.version(SettingsWebDbVersion).stores({ settings: '' });
  const table = db.table<TGameSettings>('settings');

  async function findSettings(): Promise<TGameSettings | undefined> {
    return (await table.get(id)) ?? undefined;
  }

  async function getSettings(): Promise<TGameSettings> | never {
    const value: TGameSettings | undefined = await findSettings();
    if (isNotDefined(value)) throw new Error(`[APP][SettingsWebDbService]: No settings found in the database "${dbName}"`);
    return value;
  }

  async function setSettings(value: TGameSettings): Promise<void> {
    await table.put(value, id);
  }

  async function updateSettings(patch: TDeepPartial<TGameSettings>): Promise<void> | never {
    if (!isPartialSettings(patch)) throw new Error('[APP][SettingsWebDbService]: Invalid settings patch, cannot update settings');

    return void db.transaction('rw', table, async (): Promise<TGameSettings> | never => {
      const current: TGameSettings | undefined = await findSettings();
      if (isNotDefined(current)) throw new Error(`[APP][SettingsWebDbService]: No settings found in the database "${dbName}", cannot update settings`);
      const value: TGameSettings = patchObject(current, patch);

      await table.put(value, id);
      return value;
    });
  }

  return {
    findSettings,
    getSettings,
    setSettings,
    updateSettings
  };
}

export const settingsWebDbService: TSettingsWebDbService = SettingsWebDbService();
