import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Main from '.';

const meta: ComponentMeta<typeof Main> = {
    title: 'Screens/Main',
    component: Main,
};

export default meta;

const Template: StoryFn<typeof Main> = function (args) {
    return <Main {...args} />;
};

export const Default: StoryObj<typeof Main> = {
    render: Template,
    args: {},
};
