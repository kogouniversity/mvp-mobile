import React from 'react';
import { Alert, View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import EmailInputForm, { EmailInputFormProps } from '.';

const meta: ComponentMeta<typeof EmailInputForm> = {
    title: 'Components/EmailInputForm',
    component: EmailInputForm,
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

type Story = StoryObj<EmailInputFormProps>;

export const Default: Story = {
    args: {
        username: 'test',
        password: '123456',
        onSubmit: email => Alert.alert(`EmailInputForm email:${email}`),
    },
};
