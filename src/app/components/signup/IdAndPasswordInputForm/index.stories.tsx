import React from 'react';
import { Alert, View } from 'react-native';
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
        onSubmit: (id, password) => Alert.alert(`IdAndPasswordInputForm: id: ${id}, password: ${password}`),
    },
};
