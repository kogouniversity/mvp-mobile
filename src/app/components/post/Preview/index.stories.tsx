import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { PostPreviewProps } from './types';
import { List, ListItem } from '../../../atoms/List';
import Preview from './index';
import { ImageSrcUrl } from '../../../utils/images';

const meta: ComponentMeta<typeof Preview> = {
    title: 'Components/Post/Preview',
    component: Preview,
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

type PPStory = StoryObj<PostPreviewProps>;
type PPLStory = StoryObj<PostPreviewProps[]>;

const styles = StyleSheet.create({
    verticalList: {
        borderBottomWidth: 0.5,
        borderColor: '#d3d3d3',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export const Default: PPStory = {
    args: {
        width: 390,
        height: 74,
        imagesUrl: [],
        imageLink: ImageSrcUrl.default_gp,
        groupName: '벤쿠버 유학생 방',
        title: '오늘 저녁 뭐 먹을지 고르는거 도와주셈',
        contentPreview: '모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥',
        timestamp: new Date(),
        numOfLikes: 13,
        numOfComments: 5,
        userName: 'Ananymous',
        authorSchoolName: 'UBC',
    },
    render: args => <Preview {...args} />,
};

export const WithImages: PPStory = {
    args: {
        width: 390,
        height: 74,
        imagesUrl: ['img1', 'img2', 'img3'],
        imageLink: ImageSrcUrl.default_gp,
        groupName: 'Simon Fraser University',
        title: 'What should I do if I put my laptop in my car',
        contentPreview: 'and took a bus to school',
        timestamp: new Date(),
        numOfLikes: 13,
        numOfComments: 5,
        userName: 'Ananymous',
        authorSchoolName: 'UBC',
    },
    render: args => <Preview {...args} />,
};

export const ListDefault: PPLStory = {
    args: [
        {
            width: 390,
            height: 74,
            imagesUrl: ['img1', 'img2', 'img3'],
            imageLink: ImageSrcUrl.default_gp,
            groupName: 'Simon Fraser University',
            title: 'What should I do if I put my laptop in my car',
            contentPreview: 'and took a bus to school',
            timestamp: new Date(),
            numOfLikes: 13,
            numOfComments: 5,
            userName: 'Ananymous',
            authorSchoolName: 'UBC',
            onPress: () => {},
        },
        {
            width: 390,
            height: 74,
            imagesUrl: ['img1', 'img2', 'img3'],
            imageLink: ImageSrcUrl.default_gp,
            groupName: 'Simon Fraser University',
            title: 'What should I do if I put my laptop in my car',
            contentPreview: 'and took a bus to school',
            timestamp: new Date(),
            numOfLikes: 13,
            numOfComments: 5,
            userName: 'Ananymous',
            authorSchoolName: 'UBC',
            onPress: () => {},
        },
        {
            width: 390,
            height: 74,
            imagesUrl: ['img1', 'img2', 'img3'],
            imageLink: ImageSrcUrl.default_gp,
            groupName: 'Simon Fraser University',
            title: 'What should I do if I put my laptop in my car',
            contentPreview: 'and took a bus to school',
            timestamp: new Date(),
            numOfLikes: 13,
            numOfComments: 5,
            userName: 'Ananymous',
            authorSchoolName: 'UBC',
            onPress: () => {},
        },
    ],
    render: args => (
        <List>
            {Object.values(args).map((postProps, index) => (
                <ListItem style={styles.verticalList}>
                    <Preview {...postProps} />
                </ListItem>
            ))}
        </List>
    ),
};
