import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import AuthLogin from '.';
import FallbackPlaceholder from '../../../fallback/FallbackStorybookPlaceholder';
import { NavigationParamList } from '../../../../navigator/types';

const NavigationDecorator = function (Story: StoryFn): JSX.Element {
    const Stack = createNativeStackNavigator<NavigationParamList>();
    return (
        <NavigationContainer independent>
            <Stack.Navigator initialRouteName="/Login">
                <Stack.Screen name="/Login" component={Story} />
                <Stack.Screen
                    name="/Signup"
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component={() => <FallbackPlaceholder screenTitle="/Signup" />}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const meta: ComponentMeta<typeof AuthLogin> = {
    title: 'Screens/Auth/Login/AuthLogin',
    component: AuthLogin,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    flex: 1,
                }}>
                {NavigationDecorator(Story)}
            </View>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<object>;

export const Default: Story = {};
