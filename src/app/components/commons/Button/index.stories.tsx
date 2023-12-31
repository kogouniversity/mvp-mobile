import { View } from 'react-native';
import type { ComponentMeta, StoryFn } from '@storybook/react-native';
import { Button } from '.';

const meta: ComponentMeta<typeof Button> = {
    title: 'Design System/Atoms/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary'],
            control: { type: 'radio' },
        },
        size: {
            options: ['sm', 'md'],
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

export const Primary = {
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
