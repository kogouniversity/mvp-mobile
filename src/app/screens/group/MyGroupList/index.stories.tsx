import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import GroupMyGroups from '.';

const meta: ComponentMeta<typeof GroupMyGroups> = {
    title: 'Screens/Group/GroupMyGroups',
    component: GroupMyGroups,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type MGSStory = StoryObj<object>;

export const Default: MGSStory = {
    render: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <GroupMyGroups />
        </View>
    ),
};
