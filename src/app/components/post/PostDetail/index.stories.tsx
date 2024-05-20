import React from 'react';
import { ComponentMeta, ComponentStory, StoryFn } from '@storybook/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetail from './index';

const meta: ComponentMeta<typeof PostDetail> = {
    title: 'Components/Post/PostDetail',
    component: PostDetail,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: ComponentStory<typeof PostDetail> = function (args) {
    return <PostDetail {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    postID: '3',
};

export const NoResult = Template.bind({});
NoResult.args = {
    postID: '99999',
};
