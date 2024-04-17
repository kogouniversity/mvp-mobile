import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Tag from '.';
import { TagProps } from './types';

const meta: ComponentMeta<typeof Tag> = {
    title: 'Atoms/Tag',
    component: Tag,
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

export const Default: StoryObj<TagProps> = {
    args: {
        onPress: () => {},
    },
    render: args => <Tag {...args}>school</Tag>,
};
