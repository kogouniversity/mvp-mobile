import React from 'react';
import { ComponentMeta, ComponentStory, StoryFn } from '@storybook/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyGroupFeed from './MyGroupFeed';

const meta: ComponentMeta<typeof MyGroupFeed> = {
    title: 'Components/Post/MyGroupFeed',
    component: MyGroupFeed,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: ComponentStory<typeof MyGroupFeed> = function (args) {
    return <MyGroupFeed {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    userID: '3',
};

export const NoResult = Template.bind({});
NoResult.args = {
    userID: '99999',
};
