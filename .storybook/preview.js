// import 'fast-text-encoding';
// import 'react-native-url-polyfill/auto';

// import axios from 'axios';
// import { addDecorator } from '@storybook/react-native';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { initialize, withMsw } from './mswDecorator';
// import { mswApiUrl } from '../src/test-automation/msw/utils';

// // Initialize MSW
// initialize();
// addDecorator(withMsw);
// axios.defaults.baseURL=mswApiUrl();

// export const parameters = {
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// };

// export const queryClient = new QueryClient();

// export const decorators = [
//   (Story) => (
//     <QueryClientProvider client={queryClient}>
//       {Story()}
//     </QueryClientProvider>
//   )
// ];