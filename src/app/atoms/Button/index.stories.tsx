import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { AntDesign } from '@expo/vector-icons';
import Button from '.';
import { ButtonProps } from './types';
import Typography from '../Typography';

const meta: ComponentMeta<typeof Button> = {
    title: 'Atoms/Button',
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
        disabled: {
            options: [false, true],
            control: { type: 'radio' },
        },
        isLoading: {
            options: [false, true],
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

export const OnlyText: Story = {
    args: {
        variant: 'primary',
        size: 'md',
    },
    render: args => (
        <Button {...args}>
            <Typography variant="subtitle" color="text">
                OnlyText
            </Typography>
        </Button>
    ),
};

export const OnlyIcon: Story = {
    args: {
        variant: 'primary',
        size: 'md',
    },
    render: args => (
        <Button {...args}>
            <AntDesign name="check" size={24} color="green" />
        </Button>
    ),
};

export const TextIcon: Story = {
    args: {
        variant: 'primary',
        size: 'sm',
        style: { flexDirection: 'row' },
    },
    render: args => (
        <Button {...args}>
            <Typography variant="subtitle" color="text">
                Check
            </Typography>
            <AntDesign name="check" size={24} color="green" />
        </Button>
    ),
};
