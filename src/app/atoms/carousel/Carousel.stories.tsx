import { View, StyleSheet, Dimensions } from 'react-native';
import Typography from '../Typography';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Carousel, { CarouselProp } from './Carousel';

type courseInfo = {
    courseName: string;
    location: string;
    time: string;
};

type dataType<T> = {
    [x: string]: any;
    type: string;
    data: T[];
};

const sampleData = [
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

const sampleRenderItem = (items: dataType<courseInfo | string>) => {
    const newItem = items.item;
    // flatlist에서 주는 각 item들의 형식이 정해져있음
    // 여기선 필요한 data가 items.item안에 있음

    return newItem.type == 'lectures' ? (
        <View style={styles.box}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Today's Lectures
            </Typography>
            {newItem.data.map((item: courseInfo) => (
                <View style={styles.lectureInfo}>
                    <View style={styles.leftText}>
                        <Typography variant="text" color="text">
                            {item.courseName}
                        </Typography>
                        <Typography variant="subtext" color="text">
                            {item.location}
                        </Typography>
                    </View>
                    <View style={styles.rightText}>
                        <Typography variant="text" color="text">
                            {item.time}
                        </Typography>
                    </View>
                </View>
            ))}
        </View>
    ) : (
        <View style={styles.box}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Today's TODO
            </Typography>
            {newItem.data.map((item: string) => {
                return (
                    <View>
                        <Typography variant="text" color="text">
                            {item}
                        </Typography>
                    </View>
                );
            })}
        </View>
    );
};

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
    title: 'Design System/Atoms/Carousel',
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

type Story = StoryObj<CarouselProp<dataType<courseInfo | string>>>;

export const Default: Story = {
    args: {
        data: sampleData,
        renderItem: sampleRenderItem,
    },
    render: args => {
        return <Carousel {...args} />;
    },
};
