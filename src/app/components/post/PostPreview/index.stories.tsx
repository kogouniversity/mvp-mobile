import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { PostPreviewProps } from './types';
import { List, ListItem } from '../../../atoms/List';
import PostPreview from '.';
import { ImageSrcUrl } from '../../../utils/images';

const meta: ComponentMeta<typeof PostPreview> = {
    title: 'Components/post/PostPreview',
    component: PostPreview,
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
        imageLink: ImageSrcUrl.chick,
        groupName: '벤쿠버 유학생 방',
        title: '오늘 저녁 뭐 먹을지 고르는거 도와주셈',
        contentPreview: '모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥',
        timestamp: new Date(),
        numOfLikes: 13,
        numOfComments: 5,
        authorSchoolName: 'UBC',
    },
    render: args => <PostPreview {...args} />,
};

export const ContentOverload: PPStory = {
    args: {
        width: 390,
        height: 74,
        imageLink: ImageSrcUrl.chick,
        groupName: '벤쿠버 유학생 방',
        title: '오늘 저녁 뭐 먹을지 고르는거 도와주셈',
        contentPreview: '모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥 ㄴㅇㄴㅇㄴㅇㄴㅇㄴㅇㄴㅇㄴㅇㄴㅇㄴㅇㄴㄴㅇㄴㅇ',
        timestamp: new Date(),
        numOfLikes: 13,
        numOfComments: 5,
        authorSchoolName: 'UBC',
    },
    render: args => <PostPreview {...args} />,
};

export const LikeCommentOverload: PPStory = {
    args: {
        width: 390,
        height: 74,
        imageLink: ImageSrcUrl.chick,
        groupName: '벤쿠버 유학생 방',
        title: '오늘 저녁 뭐 먹을지 고르는거 도와주셈',
        contentPreview: '모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥',
        timestamp: new Date(),
        numOfLikes: 5000,
        numOfComments: 5000,
        authorSchoolName: 'UBC',
    },
    render: args => <PostPreview {...args} />,
};

export const ListDefault: PPLStory = {
    args: [
        {
            width: 390,
            height: 74,
            imageLink: ImageSrcUrl.chick,
            groupName: '벤쿠버 유학생 방',
            title: '오늘 저녁 뭐 먹을지 고르는거 도와주셈',
            contentPreview: '모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥',
            timestamp: new Date(),
            numOfLikes: 13,
            numOfComments: 5,
            authorSchoolName: 'UBC',
            onPress: () => console.log('pressed'),
        },
        {
            width: 390,
            height: 74,
            imageLink: ImageSrcUrl.chick,
            groupName: 'SFU Students',
            title: 'What should I do if I put my laptop in my car',
            contentPreview:
                'and took a bus to school sdssssssssssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaa',
            timestamp: new Date(),
            numOfLikes: 13,
            numOfComments: 5,
            authorSchoolName: 'SFU',
            onPress: () => console.log('pressed'),
        },
        {
            width: 390,
            height: 74,
            imageLink: ImageSrcUrl.chick,
            groupName: '벤쿠버 유학생 방',
            title: '오늘 저녁 뭐 먹을지 고르는거 도와주셈',
            contentPreview: '모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥',
            timestamp: new Date(),
            numOfLikes: 5000,
            numOfComments: 5000,
            authorSchoolName: 'UBC',
            onPress: () => console.log('pressed'),
        },
    ],
    render: args => (
        <List>
            {Object.values(args).map((postProps, index) => (
                <ListItem style={styles.verticalList}>
                    <PostPreview {...postProps} />
                </ListItem>
            ))}
        </List>
    ),
};
