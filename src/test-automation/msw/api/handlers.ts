import { handlers as loginHandlers } from './auth/login';
import { handlers as signUpHandlers } from './auth/signup';
import { handlers as schoolsHandlers } from './school';
import { handlers as mygroupHandlers } from './group/mygroup';

export default [...loginHandlers, ...signUpHandlers, ...schoolsHandlers, ...mygroupHandlers];
