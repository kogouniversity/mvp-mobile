import React from 'react';
import { ComponentMeta, ComponentStory, StoryFn } from '@storybook/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Trending from './Trending';

const meta: ComponentMeta<typeof Trending> = {
    title: 'Components/Post/Trending',
    component: Trending,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: ComponentStory<typeof Trending> = function (args) {
    return <Trending {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    userID: '3',
};

export const NoResult = Template.bind({});
NoResult.args = {
    userID: '99999',
};
