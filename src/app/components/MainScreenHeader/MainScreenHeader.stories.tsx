import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Header from './MainScreenHeader';

export default {
    title: 'Components/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: StoryFn<typeof Header> = function (args) {
    return <Header {...args} />;
};

export const Default: StoryObj<typeof Header> = {
    render: Template,
    args: {},
};
