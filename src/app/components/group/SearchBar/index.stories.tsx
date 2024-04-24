import React from 'react';
import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import SearchBar from './index';

const meta: ComponentMeta<typeof SearchBar> = {
    title: 'Components/Group/SearchBar',
    component: SearchBar,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    padding: 10,
                    flex: 1,
                }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type SearchBarStory = StoryObj<typeof SearchBar>;

export const Default: SearchBarStory = {
    render: args => <SearchBar />,
};
