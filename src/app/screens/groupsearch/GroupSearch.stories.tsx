import React from 'react';
import { View, Text } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import GroupSearch from './GroupSearch';

const meta: ComponentMeta<typeof GroupSearch> = {
    title: 'screens/GroupSearch',
    component: GroupSearch,
    decorators: [],
};

export default meta;

type MGSStory = StoryObj<{}>;

export const Default: MGSStory = {
    render: () => (
        <View>
            <GroupSearch />
        </View>
    ),
};
