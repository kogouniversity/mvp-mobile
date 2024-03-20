import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj, StoryFn } from '@storybook/react-native';
import NewPost from './NewPost';

const meta: ComponentMeta<typeof NewPost> = {
    title: 'screens/NewPost',
    component: NewPost,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<{}>;
export const Default: Story = {};
