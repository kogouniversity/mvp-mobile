import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import TextField from '.';
import { TextFieldProps } from './types';

const meta: ComponentMeta<typeof TextField> = {
    title: 'Design System/Atoms/Inputs/TextField',
    component: TextField,
    argTypes: {
        variant: {
            options: ['standard', 'outlined', 'filled'],
            control: { type: 'radio' },
        },
    },
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

type Story = StoryObj<TextFieldProps>;

export const Standard: Story = {
    args: {
        variant: 'standard',
        placeholder: 'example',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        placeholder: 'example',
    },
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        placeholder: 'example',
    },
};
