import { handlers as myGroupHandlers } from './mygroup';
import { handlers as groupSearchHandlers } from './groupsearch';

export const handlers = [...myGroupHandlers, ...groupSearchHandlers];
