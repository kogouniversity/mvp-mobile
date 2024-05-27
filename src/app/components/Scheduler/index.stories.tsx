import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Scheduler from '.';
import courses from './courses.json';

export default {
    title: 'Components/Scheduler',
    component: Scheduler,
} as ComponentMeta<typeof Scheduler>;

const Template: StoryFn<typeof Scheduler> = function (args) {
    return <Scheduler courses={courses} {...args} />;
};

export const Default: StoryObj<typeof Scheduler> = {
    render: Template,
    args: {},
};
