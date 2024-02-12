import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import Skeleton from '.';
import { SkeletonProps } from './types';

const meta: ComponentMeta<typeof Skeleton> = {
    title: 'Design System/Atoms/Skeleton',
    component: Skeleton,
    argTypes: {
        variant: {
            options: ['text', 'circular', 'rectangular', 'rounded'],
            control: { type: 'radio' },
        },
        width: {
            control: { type: 'text' },
        },
        height: {
            control: { type: 'text' },
        },
    },
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type Story = StoryObj<SkeletonProps>;

export const TextVariant: Story = {
    args: {
        variant: 'text',
        width: 120,
        height: 20,
    },
};

export const CircularVariant: Story = {
    args: {
        variant: 'circular',
        width: 60,
        height: 60,
    },
};

export const RectangularVariant: Story = {
    args: {
        variant: 'rectangular',
        width: 210,
        height: 118,
    },
};

export const RoundedVariant: Story = {
    args: {
        variant: 'rounded',
        width: 210,
        height: 60,
    },
};

export const Example: StoryObj = {
    render: () => (
        <View style={styles.container}>
            <View style={styles.row}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton
                    variant="rectangular"
                    width={300}
                    height={50}
                    style={styles.marginLeft}
                />
            </View>

            <View style={styles.row}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton
                    variant="rounded"
                    width={300}
                    height={50}
                    style={styles.marginLeft}
                />
            </View>

            <Skeleton
                variant="text"
                width={360}
                height={20}
                style={styles.textLine}
            />
            <Skeleton
                variant="text"
                width={360}
                height={20}
                style={styles.textLine}
            />
            <Skeleton
                variant="text"
                width={360}
                height={20}
                style={styles.textLine}
            />
        </View>
    ),
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    marginLeft: {
        marginLeft: 10,
    },
    textLine: {
        marginTop: 5,
    },
});
