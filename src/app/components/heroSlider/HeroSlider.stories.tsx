import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import HeroSlider from './HeroSlider';
import { View } from 'react-native';
import Typography from '../../atoms/Typography';

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

type Story = StoryObj;

const sampleData = [
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

const sampleRenderItem = (
    <View>
        <View>
            <Typography variant="subtitle" color="text">
                Today's Lecture
            </Typography>
        </View>
        <View>
            <View>
                <Typography variant="text" color="text">
                    course name
                </Typography>
            </View>
            <View>
                <Typography variant="text" color="text">
                    location
                </Typography>
                <Typography variant="text" color="text">
                    Time
                </Typography>
            </View>
        </View>
    </View>
);

export const Default: Story = {
    args: {
        data: sampleData,
    },
    render: args => <HeroSlider {...args} />,
};
