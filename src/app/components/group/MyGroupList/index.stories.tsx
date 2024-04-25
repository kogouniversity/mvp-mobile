import React from 'react';
import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import MyGroupList, { MyGroupListProps } from './index';

const meta: ComponentMeta<typeof MyGroupList> = {
    title: 'Components/Group/MyGroupList',
    component: MyGroupList,
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

type MGLStory = StoryObj<MyGroupListProps>;

export const Default: MGLStory = {
    args: {
        userId: '3',
    },
    render: args => <MyGroupList {...args} />,
};
