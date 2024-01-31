import { View } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Typography from './index';
import { TypographyProps } from './types';

const meta: ComponentMeta<typeof Typography> = {
    title: 'Design System/Atoms/Typography',
    component: Typography,
    render: args => (
        <Typography {...args}>Lorem ipsum dolor sit amet</Typography>
    ),
    argTypes: {
        variant: {
            options: ['title', 'subtitle', 'text', 'subtext'],
            control: { type: 'radio' },
        },
        color: {
            options: ['text', 'subtext', 'shade', 'notification'],
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
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<TypographyProps>;

export const Title: Story = {
    args: {
        variant: 'title',
        color: 'text',
    },
};
