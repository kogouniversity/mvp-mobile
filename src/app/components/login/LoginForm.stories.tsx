import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryObj, StoryFn } from '@storybook/react-native';
import Login, { LoginFormProps } from './LoginForm';

const meta: ComponentMeta<typeof Login> = {
    title: 'Components/Login',
    component: Login,
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

type Story = StoryObj<LoginFormProps>;
export const Default: Story = {
    args: {
        onSubmit: data => {
            console.log('onSubmit (LoginForm)');
            console.log(data);
        },
    },
};
