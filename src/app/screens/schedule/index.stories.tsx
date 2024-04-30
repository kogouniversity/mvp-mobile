import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import ScheduleScreen from './index';

export default {
  title: 'Screens/Schedule',
  component: ScheduleScreen,
} as ComponentMeta<typeof ScheduleScreen>;


const Template: ComponentStory<typeof ScheduleScreen> = (args) => <ScheduleScreen/>;

export const Default: ComponentStory<typeof ScheduleScreen> = Template.bind({});
Default.args = {
};


