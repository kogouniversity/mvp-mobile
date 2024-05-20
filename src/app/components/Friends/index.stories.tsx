import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Friends from './index';

export default {
    title: 'Components/Friends',
    component: Friends,
} as ComponentMeta<typeof Friends>;

const Template: StoryFn<typeof Friends> = function (args) {
    return <Friends userId="3" {...args} />;
};

export const Default: StoryObj<typeof Friends> = {
    render: Template,
    args: {},
};
