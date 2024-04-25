import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj, StoryFn } from '@storybook/react-native';
import GroupNewGroup from '.';

const meta: ComponentMeta<typeof GroupNewGroup> = {
    title: 'Screens/Group/GroupNewGroup',
    component: GroupNewGroup,
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
