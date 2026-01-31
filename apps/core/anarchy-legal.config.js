import commercialBase from '../../configs/AnarchyLegal/anarchy-legal.base.commercial.config.js';
import { GameDisplayName, ShowcasesSoftwareFamilyName, ShowcasesSupportedPlatforms, ShowcasesSystemRequirements } from '../../packages/shared/src/Legal/ShowcasesLegalConstants.js';

//Commercial configuration for legal docs
export default {
  ...commercialBase,
  GENERIC: {
    ...commercialBase.GENERIC,
    messages: {
      ...commercialBase.GENERIC.messages,
      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: GameDisplayName,
      IS_GAME: true,

      SUPPORTED_PLATFORMS: ShowcasesSupportedPlatforms.Web,
      MIN_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Web.Minimum,
      REC_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Web.Recommended,
      PRODUCT_MODEL_CODE: ShowcasesSoftwareFamilyName,
      CONFORMITY_SERIES: 'XXX_CONFORMITY_SERIES_CORE', //A range of versions (major version) that matches of package.json, which were published commercially
      BASELINE_VERSION: 'XXX_BASELINE_VERSION_CORE', //First CE-market release version
      BASELINE_EFFECTIVE_DATE: 'XXX_BASELINE_EFFECTIVE_DATE_CORE', //The date of the first CE-market release
      INITIAL_RELEASE_DATE: 'XXX_INITIAL_RELEASE_DATE' //The date of the first release (at lest in EU)
    }
  }
};
