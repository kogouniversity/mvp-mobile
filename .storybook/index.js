import { getStorybookUI, addDecorator } from '@storybook/react-native';
import { queryClient } from './preview';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({});

addDecorator(storyFn => {
  queryClient.clear();
  return storyFn;
});

export default StorybookUIRoot;
