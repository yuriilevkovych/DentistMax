import { contentNavigation } from './contentNavigation.js';
import { zeContentPages } from './zeContentPages.js';
import { parContentPages } from './parContentPages.js';
import { kbrContentPages } from './kbrContentPages.js';

const routes = {
  contentNavigation,
  contentPageNavigation: {
    ze: zeContentPages,
    par: parContentPages,
    kbr: kbrContentPages,
  },
};

export { routes };
