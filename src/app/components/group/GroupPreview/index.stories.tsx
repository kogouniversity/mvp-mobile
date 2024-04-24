import React from 'react';
import { View } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { GroupPreviewProps } from './types';
import GroupPreview from '.';
import { ImageSrcUrl } from '../../../utils/images';

const meta: ComponentMeta<typeof GroupPreview> = {
    title: 'Components/Group/GroupPreview',
    component: GroupPreview,
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

type GPStory = StoryObj<GroupPreviewProps>;

export const Default: GPStory = {
    args: {
        width: 390,
        height: 74,
        imageLink: ImageSrcUrl.chick,
        groupName: '밴쿠버 유학생 방',
        groupDescription: '밴쿠버에 있는 모든 대학교 학생들을 위한 소통방입니다^^',
        numOfMembers: 178,
    },
    render: args => <GroupPreview {...args} />,
};
