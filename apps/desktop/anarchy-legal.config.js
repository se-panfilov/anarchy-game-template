import gameConfig from '../core/anarchy-legal.config.js';
import { GameDisplayName, ShowcasesSupportedPlatforms, ShowcasesSystemRequirements } from '@Shared/Legal/LegalConstants.js';

//Commercial configuration for legal docs
export default {
  ...gameConfig,
  GENERIC: {
    ...gameConfig.GENERIC,
    messages: {
      ...gameConfig.GENERIC.messages,

      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: GameDisplayName,

      SUPPORTED_PLATFORMS: ShowcasesSupportedPlatforms.Desktop,
      MIN_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Desktop.Minimum,
      REC_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Desktop.Recommended,
      CONFORMITY_SERIES: 'XXX_CONFORMITY_SERIES_DESKTOP', //A range of versions (major version) that matches of package.json, which were published commercially
      BASELINE_VERSION: 'XXX_BASELINE_VERSION_DESKTOP', //First CE-market release version
      BASELINE_EFFECTIVE_DATE: 'XXX_BASELINE_EFFECTIVE_DATE_DESKTOP' //The date of the first CE-market release
    }
  }
};
