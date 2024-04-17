import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Switch from '.';
import { SwitchProps } from './types';

const meta: ComponentMeta<typeof Switch> = {
    title: 'Atoms/Switch',
    component: Switch,
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

export const Default: StoryObj<SwitchProps> = {
    args: {
        value: true,
        onSwitch: () => {},
    },
    render: args => <Switch {...args} />,
};
