import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Schedule from './Schedule';
import courses from './courses.json';

export default {
    title: 'Components/Schedule',
    component: Schedule,
} as ComponentMeta<typeof Schedule>;

const Template: StoryFn<typeof Schedule> = function (args) {
    return <Schedule courses={courses} {...args} />;
};

export const Default: StoryObj<typeof Schedule> = {
    render: Template,
    args: {},
};
