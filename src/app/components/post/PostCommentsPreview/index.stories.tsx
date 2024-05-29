import React from 'react';
import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import CommentsList from './comments';
import { Comment } from './types';

const meta: ComponentMeta<typeof CommentsList> = {
    title: 'Components/Post/CommentsList',
    component: CommentsList,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: '#f0f0f0',
                }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type CommentsListStory = StoryObj<{ postID?: string; comments?: Comment[] }>;

export const Default: CommentsListStory = {
    args: {
        postID: '3',
    },
    render: args => <CommentsList {...args} />,
};
