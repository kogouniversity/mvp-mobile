import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationParamList } from './types';
import { withStatusBar } from '../screens/hoc';
import Intro from '../screens/Intro';
import Login from '../screens/login/Login';
import Home from '../screens/main/Home';
import MySchool from '../screens/main/MySchool';
import Profile from '../screens/main/Profile';
import Explore from '../screens/main/Explore';
import EmailInput from '../screens/signup/EmailInput';
import EmailVerificationInput from '../screens/signup/EmailVerificationInput';
import IdAndPasswordInput from '../screens/signup/IdAndPasswordInput';

// ======================
// Stack Navigator
// ======================
const Stack = createNativeStackNavigator<NavigationParamList>();

function OnBoardingNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={withStatusBar(Intro)} />
            <Stack.Screen name="Login" component={withStatusBar(Login)} />
            <Stack.Screen name="SignUp" component={SignUpNavigator} />
        </Stack.Navigator>
    );
}

function SignUpNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="IdAndPasswordInput" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="IdAndPasswordInput" component={withStatusBar(IdAndPasswordInput)} />
            <Stack.Screen name="EmailInput" component={withStatusBar(EmailInput)} />
            <Stack.Screen name="EmailVerificationInput" component={withStatusBar(EmailVerificationInput)} />
        </Stack.Navigator>
    );
}

// ======================
// Tab Navigator
// ======================
const Tab = createBottomTabNavigator<NavigationParamList>();

function MainNavigator(): JSX.Element {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={withStatusBar(Home)} />
            <Tab.Screen name="MySchool" component={withStatusBar(MySchool)} />
            <Tab.Screen name="Explore" component={withStatusBar(Explore)} />
            <Tab.Screen name="Profile" component={withStatusBar(Profile)} />
        </Tab.Navigator>
    );
}

// ======================
// Root Navigation
// ======================
export default function RootNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoarding" component={OnBoardingNavigator} />
            <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
    );
}
