import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj, StoryFn } from '@storybook/react-native';
import NewPost from './NewPost';
import { NavigationContainer } from '@react-navigation/native';

const meta: ComponentMeta<typeof NewPost> = {
    title: 'screens/NewPost',
    component: NewPost,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <NavigationContainer>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Story />
                </View>
            </NavigationContainer>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<{}>;
export const Default: Story = {};
