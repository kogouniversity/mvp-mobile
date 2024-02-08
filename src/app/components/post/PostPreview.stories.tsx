import React from 'react';
import PostPreview from './PostPreview';
import { PostPreviewProps } from './types';
import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { ImageSourcePropType } from 'react-native';
import { List, ListItem, ListItemButton } from '../../atoms/List/index';
import { StyleSheet } from 'react-native';

const meta: ComponentMeta<typeof PostPreview> = {
    title: 'Design System/components/post/PostPreview',
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
        alignItems: 'center'
    },
});

export const Default: PPStory = {
    args: {
        width: 390,
        height: 74,
        imageLink: require('../../assets/images/chick.png') as ImageSourcePropType,
        groupName: "벤쿠버 유학생 방",
        title: "오늘 저녁 뭐 먹을지 고르는거 도와주셈",
        contentPreview: "모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥",
        timestamp: new Date(),
        numOfLikes: 13,
        numOfComments: 5,
        authorSchoolName: "UBC",
        authorName: "unknown123",
    },
};

export const ListDefault: PPLStory = {
    args: [
        {
            width: 390,
            height: 74,
            imageLink: require('../../assets/images/chick.png') as ImageSourcePropType,
            groupName: "벤쿠버 유학생 방",
            title: "오늘 저녁 뭐 먹을지 고르는거 도와주셈",
            contentPreview: "모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥",
            timestamp: new Date(),
            numOfLikes: 13,
            numOfComments: 5,
            authorSchoolName: "UBC",
            authorName: "unknown123",
            onPress: () => console.log("pressed"),
        },
        {
            width: 390,
            height: 74,
            imageLink: require('../../assets/images/chick.png') as ImageSourcePropType,
            groupName: "벤쿠버 유학생 방",
            title: "오늘 저녁 뭐 먹을지 고르는거 도와주셈",
            contentPreview: "모짜솔솔김볶밥 vs 차돌돌돌만불닭볶밥",
            timestamp: new Date(),
            numOfLikes: 300,
            numOfComments: 5,
            authorSchoolName: "UBC",
            authorName: "unknown123",
            onPress: () => console.log("pressed"),
        },
    ],
    render: args => (
        <List {...args}>
            <ListItem style={styles.verticalList}>
                <ListItemButton>
                    <PostPreview {...args[0]} />
                </ListItemButton>
            </ListItem>
            <ListItem style={styles.verticalList}>
                <ListItemButton>
                    <PostPreview {...args[0]} />
                </ListItemButton>
            </ListItem>
        </List>
    ),
};