import { handlers as loginHandlers } from './auth/login';
import { handlers as signUpHandlers } from './auth/signup';
import { handlers as schoolsHandlers } from './school';

export default [...loginHandlers, ...signUpHandlers, ...schoolsHandlers];
