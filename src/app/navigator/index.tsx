import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationParamList } from './types';
import Intro from '../screens/Intro';
import AuthLogin from '../screens/auth/AuthLogin';
import AuthSignupEmailInput from '../screens/auth/signup/AuthSignupEmailInput';
import AuthSignupEmailVerification from '../screens/auth/signup/AuthSignupEmailVerification';
import AuthSignupIdAndPassword from '../screens/auth/signup/AuthSignupIdAndPassword';
import HomeFeed from '../screens/home/HomeFeed';
import HomeMyGroup from '../screens/home/HomeMyGroup';
import HomeGadget from '../screens/home/HomeProfile';
import HomeExplore from '../screens/home/HomeExplore';
import HomeProfile from '../screens/home/HomeGadget';

const withStatusBar = (WrappedComponent: React.ComponentType): React.FC =>
    function () {
        return (
            <View>
                <StatusBar />
                <WrappedComponent />
            </View>
        );
    };

// ======================
// Stack Navigator
// ======================
const Stack = createNativeStackNavigator<NavigationParamList>();

function IntroStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={withStatusBar(Intro)} />
            <Stack.Screen name="AuthLogin" component={withStatusBar(AuthLogin)} />
            <Stack.Screen name="SignUpNav" component={SignupStackNavigator} />
        </Stack.Navigator>
    );
}

function SignupStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="AuthSignupIdAndPassword" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthSignupIdAndPassword" component={withStatusBar(AuthSignupIdAndPassword)} />
            <Stack.Screen name="AuthSignupEmailInput" component={withStatusBar(AuthSignupEmailInput)} />
            <Stack.Screen name="AuthSignupEmailVerification" component={withStatusBar(AuthSignupEmailVerification)} />
        </Stack.Navigator>
    );
}

// ======================
// Tab Navigator
// ======================
const Tab = createBottomTabNavigator<NavigationParamList>();

function HomeTabNavigator(): JSX.Element {
    return (
        <Tab.Navigator initialRouteName="HomeFeed" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeFeed" component={withStatusBar(HomeFeed)} />
            <Tab.Screen name="HomeMyGroup" component={withStatusBar(HomeMyGroup)} />
            <Tab.Screen name="HomeGadget" component={withStatusBar(HomeGadget)} />
            <Tab.Screen name="HomeExplore" component={withStatusBar(HomeExplore)} />
            <Tab.Screen name="HomeProfile" component={withStatusBar(HomeProfile)} />
        </Tab.Navigator>
    );
}

// ======================
// Root Navigator
// ======================
export default function RootNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="IntroNav" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="IntroNav" component={IntroStackNavigator} />
            <Stack.Screen name="HomeNav" component={HomeTabNavigator} />
        </Stack.Navigator>
    );
}
