import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import UploadImage from '.';
import { UploadImageProps } from './types';

const meta: ComponentMeta<typeof UploadImage> = {
    title: 'Atoms/Inputs/UploadImage',
    component: UploadImage,
    argTypes: {
        variant: {
            options: ['standard', 'mini'],
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

type Story = StoryObj<UploadImageProps>;

export const Standard: Story = {
    args: {
        variant: 'standard',
    },
};

export const Mini: Story = {
    args: {
        variant: 'mini',
    },
};
