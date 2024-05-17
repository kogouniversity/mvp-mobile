import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj } from '@storybook/react-native';
import GroupSearchGroup from '.';

const meta: ComponentMeta<typeof GroupSearchGroup> = {
    title: 'Screens/Group/GroupSearchGroup',
    component: GroupSearchGroup,
    decorators: [],
};

export default meta;

type MGSStory = StoryObj<object>;

export const Default: MGSStory = {
    render: () => (
        <View>
            <GroupSearchGroup />
        </View>
    ),
};
