import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj,StoryFn } from '@storybook/react-native';
import Login from './LoginForm';
import {LoginProps} from './LoginForm'; 


const meta: ComponentMeta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
  decorators: [
    (Story: StoryFn): JSX.Element => (
      <View
          style={{
              flex: 1,
          }}>
          <Story />
      </View>

    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<LoginProps>;
export const Default: Story = {
  args: {
    onSubmit: async (data) => {
      console.log('Login data', data);
    },
  },
};

