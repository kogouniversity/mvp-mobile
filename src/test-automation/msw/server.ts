import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';

import { setupServer } from 'msw/native';
import handlers from './api/handlers';

const server = setupServer(...handlers);
export default server;
