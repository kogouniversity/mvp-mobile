import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';

import { addDecorator } from '@storybook/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { navigationDecorator, mswDecorator } from './decorators';

addDecorator(mswDecorator);
// addDecorator(navigationDecorator);

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      {Story()}
    </QueryClientProvider>
  )
];