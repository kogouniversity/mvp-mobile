import React from 'react';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import IntroAnimation from './IntroAnimation';

export default {
    title: 'Components/IntroAnimation',
    component: IntroAnimation,
} as ComponentMeta<typeof IntroAnimation>;

const Template: StoryFn<typeof IntroAnimation> = () => <IntroAnimation />;

export const Default: StoryObj<typeof IntroAnimation> = {
    render: Template,
};
