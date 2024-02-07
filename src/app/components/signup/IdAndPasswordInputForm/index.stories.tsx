import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import IdAndPasswordInputForm, { IdAndPasswordInputFormProps } from '.';

const meta: ComponentMeta<typeof IdAndPasswordInputForm> = {
    title: 'Components/IdAndPasswordInputForm',
    component: IdAndPasswordInputForm,
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

type Story = StoryObj<IdAndPasswordInputFormProps>;

export const Default: Story = {
    args: {
        onSubmit: data => {
            console.log('onSubmit (IdAndPasswordInputForm)');
            console.log(data);
        },
    },
};
