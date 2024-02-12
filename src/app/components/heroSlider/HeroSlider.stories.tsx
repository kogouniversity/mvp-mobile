import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import HeroSlider, { HeroSliderProps } from './HeroSlider';
import { View } from 'react-native';

const meta: ComponentMeta<typeof HeroSlider> = {
    title: 'Components/HeroSlider',
    component: HeroSlider,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type Story = StoryObj<HeroSliderProps>;

const sample = [
    {
        courseName: 'CMPT 361 D100',
        location: 'Blusson Hall 9660',
        time: '1:20pm - 2:20pm',
    },
    {
        courseName: 'CMPT 295 D100',
        location: 'Blusson Hall 9660',
        time: '2:20pm - 3:20pm',
    },
    {
        courseName: 'CMPT 410 D100',
        location: 'Blusson Hall 9660',
        time: '5:20pm - 7:20pm',
    },
];

export const Default: Story = {
    args: {
        data: sample,
    },
    render: args => <HeroSlider {...args} />,
};
