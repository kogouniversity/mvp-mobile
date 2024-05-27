import React from 'react';
import { ComponentMeta, ComponentStory, StoryFn } from '@storybook/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GroupFeed from '.';

const meta: ComponentMeta<typeof GroupFeed> = {
    title: 'Components/Post/GroupFeed',
    component: GroupFeed,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: ComponentStory<typeof GroupFeed> = function (args) {
    return <GroupFeed {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    groupName: 'group1',
};

export const NoResult = Template.bind({});
NoResult.args = {
    groupName: 'aaa',
};
