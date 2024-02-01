import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import EmailInput from './EmailInput';
import VerificationCode from './VerificationCode';
import IdAndPasswordInput from './IdAndPasswordInput';
import Navigator from './Navigator';

const screens = {
    EmailInput,
    VerificationCode,
    IdAndPasswordInput,
};

const meta: ComponentMeta<typeof IdAndPasswordInput> = {
    title: 'Components/IdAndPasswordInput',
    component: IdAndPasswordInput,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    flex: 1,
                }}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof IdAndPasswordInput>;

export const Default: Story = {
    render: () => <Navigator screens={screens} />,
};
