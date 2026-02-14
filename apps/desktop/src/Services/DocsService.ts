import { AllowedAppFolders } from '@Desktop/Constants';
import type { TDocsService, TFilesService } from '@Desktop/Models';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import type { TLegalDoc, TLoadDocPayload } from '@Shared';
import { AllowedLegalDocNames, sanitizeMarkDown } from '@Shared';

export function DocsService(filesService: TFilesService): TDocsService {
  async function get({ name }: TLoadDocPayload): Promise<TLegalDoc> {
    if (isNotDefined(AllowedLegalDocNames[name])) throw new Error(`[DESKTOP] Invalid doc name. Name "${name}" is not allowed`);
    const content: string = await filesService.readFile(name + '.md', AllowedAppFolders.LegalDocs);
    const cleanContent: string = await sanitizeMarkDown(content);
    return { name, content: cleanContent };
  }

  return {
    get
  };
}
