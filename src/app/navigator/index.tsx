import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Login from '../screens/auth/login/Login';
import SignupEmailInput from '../screens/auth/signup/SignupEmailInput';
import SignupEmailVerification from '../screens/auth/signup/SignupEmailVerification';
import SignupIdAndPassword from '../screens/auth/signup/SignupIdAndPassword';
import MyGroupList from '../screens/group/MyGroupList';
import Profile from '../screens/Profile';
import Schedule from '../screens/schedule/Schedule';
import Main from '../screens/main';
import PostDetails from '../screens/post/PostDetails';
import GroupPostDetails from '../screens/post/GroupPostDetails';
import GroupFeed from '../screens/group/GroupFeed';
import Intro from '../screens/Intro';
import { NavigationParamList } from './types';
import { withStatusBar } from './hoc';
import CreateNewPost from '../screens/post/CreateNewPost';
import CreateNewGroup from '../screens/group/CreateNewGroup';
import MyPosts from '../screens/post/MyPosts';
import JoinGroupScreen from '../screens/group/JoinGroup';
import TrendingPostDetails from '../screens/post/TrendingPostDetail';
import Support from '../screens/Support';
import AuthContext from '../../store/AuthContext';

const Tab = createBottomTabNavigator<NavigationParamList>();
const Stack = createNativeStackNavigator<NavigationParamList>();

const RootNavigator = (): React.ReactElement | null => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }

    const { state } = authContext;

    if (state.isLoading) {
        console.log(state.userToken)
        return <Intro />;
    }

    return (
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            
            {state.userToken ? (
                <>
                    <Stack.Screen name="Home" component={HomeTabNavigator} />
                </>
            ) : (
                <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={SignupIdAndPassword} />
                <Stack.Screen name="SignupEmailInput" component={SignupEmailInput} />
                <Stack.Screen name="SignupEmailVerification" component={SignupEmailVerification} />
                <Stack.Screen name="Home" component={HomeTabNavigator} />
                </>
            )}
        </Stack.Navigator>
    );
};

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
                tabBarActiveTintColor: 'black',
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
            <Stack.Screen name="GroupFeed" component={withStatusBar(GroupFeed)} />
            <Stack.Screen
                name="GroupPostDetails"
                component={withStatusBar(GroupPostDetails)}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="CreateNewPost" component={withStatusBar(CreateNewPost)} />
            <Stack.Screen name="CreateNewGroup" component={withStatusBar(CreateNewGroup)} />
            <Stack.Screen name="JoinGroupScreen" component={withStatusBar(JoinGroupScreen)} />
        </Stack.Navigator>
    );
}

function FeedStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="FeedTab">
            <Stack.Screen name="FeedTab" component={withStatusBar(Main)} options={{ headerShown: false }} />
            <Stack.Screen name="PostDetails" component={withStatusBar(PostDetails)} options={{ headerShown: false }} />
            <Stack.Screen
                name="TrendingPostDetails"
                component={withStatusBar(TrendingPostDetails)}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateNewPost"
                component={withStatusBar(CreateNewPost)}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="JoinGroupScreen"
                component={withStatusBar(JoinGroupScreen)}
                options={{ headerShown: false }}
            />
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
            <Stack.Screen name="MyPosts" component={withStatusBar(MyPosts)} />
            <Stack.Screen
                name="GroupPostDetails"
                component={withStatusBar(GroupPostDetails)}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Support" component={withStatusBar(Support)} />
        </Stack.Navigator>
    );
}

export default RootNavigator;
