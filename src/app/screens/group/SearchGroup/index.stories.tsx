import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj } from '@storybook/react-native';
import SearchGroup from '.';

const meta: ComponentMeta<typeof SearchGroup> = {
    title: 'Screens/Group/SearchGroup',
    component: SearchGroup,
    decorators: [],
};

export default meta;

type MGSStory = StoryObj<object>;

export const Default: MGSStory = {
    render: () => (
        <View>
            <SearchGroup />
        </View>
    ),
};
