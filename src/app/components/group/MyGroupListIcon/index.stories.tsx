import React from 'react';
import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import MyGroupListIcon, { MyGroupListIconProps } from './index';

const meta: ComponentMeta<typeof MyGroupListIcon> = {
    title: 'Components/Group/MyGroupListIcon',
    component: MyGroupListIcon,
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

type MGLIStory = StoryObj<MyGroupListIconProps>;

export const Default: MGLIStory = {
    args: {
        userId: '3',
    },
    render: args => <MyGroupListIcon {...args} />,
};
