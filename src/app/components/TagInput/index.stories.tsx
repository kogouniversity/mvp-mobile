import React from 'react';
import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import TagInput, { TagInputProps } from '.';

const meta: ComponentMeta<typeof TagInput> = {
    title: 'Components/TagInput',
    component: TagInput,
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

export const Default: StoryObj<TagInputProps> = {
    args: {
        setTagValues: () => {},
        onChangeText: () => {},
        onBlur: () => {},
    },
    render: args => <TagInput {...args} />,
};
