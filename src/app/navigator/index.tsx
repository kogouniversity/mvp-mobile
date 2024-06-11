// navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Intro from '../screens/Intro';
import Login from '../screens/auth/login/Login';
import SignupEmailInput from '../screens/auth/signup/SignupEmailInput';
import SignupEmailVerification from '../screens/auth/signup/SignupEmailVerification';
import SignupIdAndPassword from '../screens/auth/signup/SignupIdAndPassword';
import MyGroupList from '../screens/group/MyGroupList';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Schedule from '../screens/schedule/Schedule';
import Main from '../screens/main';
import PostDetails from '../screens/post/PostDetails';
import GroupPostDetails from '../screens/post/GroupPostDetails';
import GroupFeed from '../screens/group/GroupFeed';
import { NavigationParamList } from './types';
import { withStatusBar } from './hoc';

const Tab = createBottomTabNavigator<NavigationParamList>();
const Stack = createNativeStackNavigator<NavigationParamList>();

export default function RootNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/" component={withStatusBar(Intro)} />
            <Stack.Screen name="/Login" component={withStatusBar(Login)} />
            <Stack.Screen name="/Signup" component={withStatusBar(SignupIdAndPassword)} />
            <Stack.Screen name="/Signup/EmailInput" component={withStatusBar(SignupEmailInput)} />
            <Stack.Screen name="/Signup/EmailVerification" component={withStatusBar(SignupEmailVerification)} />
            <Stack.Screen name="/Home" component={HomeTabNavigator} />
        </Stack.Navigator>
    );
}

function HomeTabNavigator(): JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName="FeedTab"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'FeedTab') {
                        return <Entypo name="home" size={size} color={color} />;
                    } else if (route.name === 'MyGroupsTab') {
                        return <Entypo name="leaf" size={size} color={color} />;
                    } else if (route.name === 'GadgetTab') {
                        return <Entypo name="calendar" size={size} color={color} />;
                    } else if (route.name === 'ProfileTab') {
                        return <Ionicons name="person-sharp" size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'lightgrey',
            })}>
            <Tab.Screen name="FeedTab" component={FeedStackNavigator} />
            <Tab.Screen name="MyGroupsTab" component={MyGroupStackNavigator} />
            <Tab.Screen name="GadgetTab" component={GadgetStackNavigator} />
            <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
}

function MyGroupStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="MyGroupsTab" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyGroupsTab" component={withStatusBar(MyGroupList)} />
            <Stack.Screen name="MyGroupsTab/Feed" component={withStatusBar(Feed)} />
            <Stack.Screen name="GroupFeed" component={withStatusBar(GroupFeed)} />
            <Stack.Screen
                name="GroupPostDetails"
                component={withStatusBar(GroupPostDetails)}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function FeedStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="FeedTab">
            <Stack.Screen name="FeedTab" component={withStatusBar(Main)} options={{ headerShown: false }} />
            <Stack.Screen name="PostDetails" component={withStatusBar(PostDetails)} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function GadgetStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="GadgetTab" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GadgetTab" component={withStatusBar(Schedule)} />
        </Stack.Navigator>
    );
}

function ProfileStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="ProfileTab" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileTab" component={withStatusBar(Profile)} />
        </Stack.Navigator>
    );
}
