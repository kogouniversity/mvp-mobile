import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import EmailVerificationCodeForm, { EmailVerificationCodeFormProps } from '.';

const meta: ComponentMeta<typeof EmailVerificationCodeForm> = {
    title: 'Components/EmailVerificationCodeForm',
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

type Story = StoryObj<EmailVerificationCodeFormProps>;

export const Default: Story = {
    args: {
        onSubmit: data => {
            console.log('onSubmit (EmailVerificationCodeForm)');
            console.log(data);
        },
    },
};
