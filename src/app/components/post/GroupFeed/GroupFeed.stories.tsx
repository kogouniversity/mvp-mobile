import React from 'react';
import { ComponentMeta,ComponentStory, StoryObj, StoryFn } from '@storybook/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GroupFeed from './GroupFeed';

const meta: ComponentMeta<typeof GroupFeed> = {
    title: 'Components/post/GroupFeed',
    component: GroupFeed,
    decorators: [
        (Story: StoryFn) => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: ComponentStory<typeof GroupFeed> = (args) => <GroupFeed {...args} />;

export const Default = Template.bind({});
Default.args = {
  groupName: 'group1',
};


export const NoResult = Template.bind({});
NoResult.args = {
  groupName: 'aaa',
};
