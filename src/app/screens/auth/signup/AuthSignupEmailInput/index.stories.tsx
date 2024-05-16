import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import AuthSignupEmailInput from '.';
import FallbackPlaceholder from '../../../fallback/FallbackPlaceholder';
import { NavigationParamList } from '../../../../navigator/types';

const NavigationDecorator = function (Story: StoryFn): JSX.Element {
    const Stack = createNativeStackNavigator<NavigationParamList>();
    return (
        <NavigationContainer independent>
            <Stack.Navigator initialRouteName="/Signup/EmailInput" screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="/Signup/EmailInput"
                    component={Story}
                    initialParams={{ username: 'testuser', password: 'testpassword' }}
                />
                <Stack.Screen
                    name="/Signup/EmailVerification"
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component={() => <FallbackPlaceholder screenTitle="/Signup/EmailVerification" />}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const meta: ComponentMeta<typeof AuthSignupEmailInput> = {
    title: 'Screens/Auth/Signup/AuthSignupEmailInput',
    component: AuthSignupEmailInput,
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
