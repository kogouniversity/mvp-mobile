import { ComponentMeta, StoryFn } from '@storybook/react-native';
import Typography from './index';

const meta: ComponentMeta<typeof Typography> = {
    title: 'Design System/Atoms/Typography',
    component: Typography,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <Story>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
            </Story>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;

export const Primary = {
    args: {},
};
