import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import Schedule from './index';

export default {
    title: 'Screens/Schedule',
    component: Schedule,
} as ComponentMeta<typeof Schedule>;

const Template: ComponentStory<typeof Schedule> = function (args) {
    return <Schedule />;
};

export const Default: ComponentStory<typeof Schedule> = Template.bind({});
Default.args = {};
