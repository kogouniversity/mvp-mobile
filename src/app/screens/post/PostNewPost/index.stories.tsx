import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj, StoryFn } from '@storybook/react-native';
import PostNewPost from '.';

const meta: ComponentMeta<typeof PostNewPost> = {
    title: 'Screens/Post/PostNewPost',
    component: PostNewPost,
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

type Story = StoryObj<object>;
export const Default: Story = {};
