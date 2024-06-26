import React from 'react';
import { Alert, View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import EmailVerificationCodeForm, { EmailVerificationFormProps } from '.';

const meta: ComponentMeta<typeof EmailVerificationCodeForm> = {
    title: 'Components/Signup/EmailVerificationCodeForm',
    component: EmailVerificationCodeForm,
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

type Story = StoryObj<EmailVerificationFormProps>;

export const Default: Story = {
    args: {
        onSubmit: (code: string) => Alert.alert(`EmailVerificationForm`, code),
        onResendCode: () => Alert.alert(`EmailVerificationForm.`, 'new code is requested'),
    },
};
