import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationParamList } from './types';
import { withStatusBar } from '../screens/hoc';
import SchoolEmailVerif from '../screens/signup/SchoolEmailVerif';
import SchoolEmailVerifCode from '../screens/signup/SchoolEmailVerifCode';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import NewUserSignUp from '../screens/signup/NewUserSignUp';
import Home from '../screens/main/Home';
import Group from '../screens/main/Group';
import Profile from '../screens/main/Profile';
import Tools from '../screens/main/Tools';

// ======================
// Stack Navigator
// ======================
const Stack = createNativeStackNavigator<NavigationParamList>();

function OnBoardingNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Intro"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={withStatusBar(Intro)} />
            <Stack.Screen name="Login" component={withStatusBar(Login)} />
            <Stack.Screen name="SignUp" component={SignUpNavigator} />
        </Stack.Navigator>
    );
}

function SignUpNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="SchoolEmailVerif"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="SchoolEmailVerif"
                component={withStatusBar(SchoolEmailVerif)}
            />
            <Stack.Screen
                name="SchoolEmailVerifCode"
                component={withStatusBar(SchoolEmailVerifCode)}
            />
            <Stack.Screen
                name="NewUserSignUp"
                component={withStatusBar(NewUserSignUp)}
            />
        </Stack.Navigator>
    );
}

// ======================
// Tab Navigator
// ======================
const Tab = createBottomTabNavigator<NavigationParamList>();

function MainNavigator(): JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={withStatusBar(Home)} />
            <Tab.Screen name="Feed" component={withStatusBar(Group)} />
            <Tab.Screen name="Tools" component={withStatusBar(Tools)} />
            <Tab.Screen name="Profile" component={withStatusBar(Profile)} />
        </Tab.Navigator>
    );
}

// ======================
// Root Navigation
// ======================
export default function RootNavigator(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="OnBoarding"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="OnBoarding"
                    component={OnBoardingNavigator}
                />
                <Stack.Screen name="Main" component={MainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
