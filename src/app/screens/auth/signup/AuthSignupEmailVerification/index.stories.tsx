import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import AuthSignupEmailVerification from '.';
import FallbackPlaceholder from '../../../fallback/FallbackPlaceholder';
import { NavigationParamList } from '../../../../navigator/types';

const NavigationDecorator = function (Story: StoryFn): JSX.Element {
    const Stack = createNativeStackNavigator<NavigationParamList>();
    return (
        <NavigationContainer independent>
            <Stack.Navigator initialRouteName="/Signup/EmailVerification">
                <Stack.Screen name="/Signup/EmailVerification" component={Story} />
                <Stack.Screen
                    name="/Home"
                    // eslint-disable-next-line react/no-unstable-nested-components
                    component={() => <FallbackPlaceholder screenTitle="/Home" />}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const meta: ComponentMeta<typeof AuthSignupEmailVerification> = {
    title: 'Screens/Auth/Signup/AuthSignupEmailVerification',
    component: AuthSignupEmailVerification,
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
