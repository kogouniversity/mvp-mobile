import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import GroupMyGroupsFeed from '.';

const meta: ComponentMeta<typeof GroupMyGroupsFeed> = {
    title: 'Screens/Group/GroupMyGroupsFeed',
    component: GroupMyGroupsFeed,
};

export default meta;

const Template: StoryFn<typeof GroupMyGroupsFeed> = function (args) {
    return <GroupMyGroupsFeed {...args} />;
};

export const Default: StoryObj<typeof GroupMyGroupsFeed> = {
    render: Template,
    args: {},
};
