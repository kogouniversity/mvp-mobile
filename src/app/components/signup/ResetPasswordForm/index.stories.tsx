import React from 'react';
import { Alert, View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import ResetPasswordForm, { ResetPasswordFormProp } from '.';

const meta: ComponentMeta<typeof ResetPasswordForm> = {
    title: 'Components/ResetPassword',
    component: ResetPasswordForm,
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

type Story = StoryObj<ResetPasswordFormProp>;

export const Default: Story = {
    args: {
        onSubmit: confirmPw => Alert.alert(`password: ${confirmPw}`),
    },
};
