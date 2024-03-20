import { handlers as loginHandlers } from './auth/login';
import { handlers as signUpHandlers } from './auth/signup';
import { handlers as schoolsHandlers } from './school';
import { handlers as postHandlers } from './post';
import { handlers as groupHandlers } from './group';
import { handlers as userHandlers } from './user';

export default [
    ...loginHandlers,
    ...signUpHandlers,
    ...schoolsHandlers,
    ...postHandlers,
    ...groupHandlers,
    ...userHandlers,
];
