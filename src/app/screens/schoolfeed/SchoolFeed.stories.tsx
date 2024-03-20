import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import UserSchoolScreen from './SchoolFeed';

const meta: ComponentMeta<typeof UserSchoolScreen> = {
  title: 'screens/UserSchoolScreen',
  component: UserSchoolScreen,
};

export default meta;

const Template: StoryFn<typeof UserSchoolScreen> = (args) => <UserSchoolScreen {...args} />;


export const Default: StoryObj<typeof UserSchoolScreen> = {
  render: Template,
  args: {},
};

