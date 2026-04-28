import { library } from '@fortawesome/fontawesome-svg-core';

// Import all icon packs
import * as solidIcons from '@fortawesome/pro-solid-svg-icons';
import * as regularIcons from '@fortawesome/pro-regular-svg-icons';
import * as lightIcons from '@fortawesome/pro-light-svg-icons';
import * as thinIcons from '@fortawesome/pro-thin-svg-icons';
import * as duotoneIcons from '@fortawesome/pro-duotone-svg-icons';
import * as sharpIcons from '@fortawesome/sharp-solid-svg-icons';

// Convert icon objects to arrays and add them to the library
const solidIconList = Object.values(solidIcons).filter((icon): icon is solidIcons.IconDefinition => 
  typeof icon === 'object' && icon !== null && 'iconName' in icon
);

const regularIconList = Object.values(regularIcons).filter((icon): icon is regularIcons.IconDefinition => 
  typeof icon === 'object' && icon !== null && 'iconName' in icon
);

const lightIconList = Object.values(lightIcons).filter((icon): icon is lightIcons.IconDefinition => 
  typeof icon === 'object' && icon !== null && 'iconName' in icon
);

const thinIconList = Object.values(thinIcons).filter((icon): icon is thinIcons.IconDefinition => 
  typeof icon === 'object' && icon !== null && 'iconName' in icon
);

const duotoneIconList = Object.values(duotoneIcons).filter((icon): icon is duotoneIcons.IconDefinition => 
  typeof icon === 'object' && icon !== null && 'iconName' in icon
);

const sharpIconList = Object.values(sharpIcons).filter((icon): icon is sharpIcons.IconDefinition => 
  typeof icon === 'object' && icon !== null && 'iconName' in icon
);

// Add all icons to the library
library.add(
  ...solidIconList,
  ...regularIconList,
  ...lightIconList,
  ...thinIconList,
  ...duotoneIconList,
  ...sharpIconList
);

export { library };
