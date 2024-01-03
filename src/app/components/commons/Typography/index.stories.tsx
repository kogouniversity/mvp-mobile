import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Typography from './index';
import { TextFieldProps } from '../../inputs/TextField/types';

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

type Story = StoryObj<TextFieldProps>;

export const Primary: Story = {
    args: {},
};
