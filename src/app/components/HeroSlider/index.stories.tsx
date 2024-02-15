import type { ComponentMeta, StoryObj } from '@storybook/react-native';
import HeroSlider from '.';

const meta: ComponentMeta<typeof HeroSlider> = {
    title: 'Components/HeroSlider',
    component: HeroSlider,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
