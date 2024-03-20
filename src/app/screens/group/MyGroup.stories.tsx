import React from 'react';
import { View, Text } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyGroup from './MyGroup';

const meta: ComponentMeta<typeof MyGroup> = {
    title: 'Screens/group/MyGroupScreen',
    component: MyGroup,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <NavigationContainer>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                    <Story />
                </View>
            </NavigationContainer>
        ),
    ],
};

export default meta;

type MGSStory = StoryObj<{}>;

export const Default: MGSStory = {
    render: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>
                <MyGroup />
            </Text>
        </View>
    )
}