import { View, StyleSheet, Dimensions } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Typography from '../Typography';
import Carousel from '.';
import { CarouselProp } from './types';

type LectureDataType = {
    type: string;
    data: {
        courseName: string;
        location: string;
        time: string;
    }[];
};

type TodoDataType = {
    type: string;
    data: string[];
};

const sampleDataSet = [
    {
        type: 'lectures',
        data: [
            {
                courseName: 'CMPT 362 D100',
                location: 'Blusson 9660',
                time: '1:30pm - 2:20pm',
            },
            {
                courseName: 'CMPT 362 D100',
                location: 'Blusson 9660',
                time: '1:30pm - 2:20pm',
            },
            {
                courseName: 'CMPT 362 D100',
                location: 'Blusson 9660',
                time: '1:30pm - 2:20pm',
            },
        ],
    },
    {
        type: 'todo',
        data: ['CMPT 362 Final Project', 'CMPT 102 Test 1', 'CMPT 102 note'],
    },
];

const sampleRenderItem = (item: (typeof sampleDataSet)[number]) =>
    // flatlist에서 주는 각 item들의 형식이 정해져있음
    // 여기선 필요한 data가 items.item안에 있음
    item.type === 'lectures' ? (
        <View style={styles.box}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Today&apos;s Lectures
            </Typography>
            {(item as LectureDataType).data.map(courseInfo => (
                <View style={styles.lectureInfo}>
                    <View style={styles.leftText}>
                        <Typography variant="text" color="text">
                            {courseInfo.courseName}
                        </Typography>
                        <Typography variant="subtext" color="text">
                            {courseInfo.location}
                        </Typography>
                    </View>
                    <View style={styles.rightText}>
                        <Typography variant="text" color="text">
                            {courseInfo.time}
                        </Typography>
                    </View>
                </View>
            ))}
        </View>
    ) : (
        <View style={styles.box}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Today&apos;s TODO
            </Typography>
            {(item as TodoDataType).data.map(todoItem => (
                <View>
                    <Typography variant="text" color="text">
                        {todoItem}
                    </Typography>
                </View>
            ))}
        </View>
    );

const width = Dimensions.get('screen').width - 20;

const styles = StyleSheet.create({
    box: {
        width,
        borderWidth: 2,
        margin: 10,
        borderRadius: 15,
        borderColor: '#d3d3d3',
        padding: 15,
    },
    title: {
        marginBottom: 5,
    },
    lectureInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    leftText: {
        marginLeft: 5,
    },
    rightText: {
        marginRight: 5,
    },
});

const meta: ComponentMeta<typeof Carousel> = {
    title: 'Atoms/Carousel',
    component: Carousel,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type Story = StoryObj<CarouselProp<LectureDataType | TodoDataType>>;

export const Default: Story = {
    args: {
        data: sampleDataSet,
        renderItem: data => sampleRenderItem(data),
    },
    render: args => <Carousel {...args} />,
};
