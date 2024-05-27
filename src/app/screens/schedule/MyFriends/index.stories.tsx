import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Friends from '.';

const meta: ComponentMeta<typeof Friends> = {
    title: 'Screens/Friends',
    component: Friends,
};

export default meta;

const Template: StoryFn<typeof Friends> = function (args) {
    return <Friends {...args} />;
};

export const Default: StoryObj<typeof Friends> = {
    render: Template,
    args: {},
};
