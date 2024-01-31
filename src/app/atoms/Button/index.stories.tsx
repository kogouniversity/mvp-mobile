import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Button from '.';
import { ButtonProps } from './types';

const meta: ComponentMeta<typeof Button> = {
    title: 'Design System/Atoms/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        size: {
            options: ['sm', 'md', 'lg'],
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

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'sm',
        text: 'Example',
    },
};

export const Secondary = {
    args: {
        variant: 'secondary',
        size: 'sm',
        text: 'Example',
    },
};

export const Tertiary = {
    args: {
        variant: 'tertiary',
        size: 'sm',
        text: 'Example',
    },
};

