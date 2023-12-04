import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from '.';

const buttonMeta = {
    title: 'Sample Button',
    component: Button,
    argTypes: {
        defaultProps: {
            text: {
                control: 'text',
                description: 'change text inside button',
            },
        },
    },
    decorators: [
        (Story): React.JSX.Element => (
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
} satisfies Meta<typeof Button>;

export default buttonMeta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        defaultProps: {
            text: 'Another example',
        },
    },
};

export const AnotherStory: Story = {
    args: {
        defaultProps: {
            text: 'Another example',
        },
    },
};
