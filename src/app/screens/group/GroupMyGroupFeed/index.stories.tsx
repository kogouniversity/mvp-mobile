import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import GroupMyGroupFeed from '.';

const meta: ComponentMeta<typeof GroupMyGroupFeed> = {
    title: 'Screens/Group/GroupMyGroupFeed',
    component: GroupMyGroupFeed,
};

export default meta;

const Template: StoryFn<typeof GroupMyGroupFeed> = function (args) {
    return <GroupMyGroupFeed {...args} />;
};

export const Default: StoryObj<typeof GroupMyGroupFeed> = {
    render: Template,
    args: {},
};
