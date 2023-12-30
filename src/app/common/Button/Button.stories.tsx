import { View } from 'react-native';
import type { Meta } from '@storybook/react-native';
import { Button } from '.';

const buttonMeta = {
    title: 'Button',
    component: Button,
    decorators: [
        Story => (
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

export const Primary = {
    args: {
        variant: 'primary',
        text: 'Example',
    },
};

export const Secondary = {
    args: {
        variant: 'secondary',
        text: 'Example',
    },
};
