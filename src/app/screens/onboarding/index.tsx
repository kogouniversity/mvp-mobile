import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withStatusBar } from '../hoc';
import Intro from './intro';
import Login from './login';
import SignUpNavigationEntry from './signup';
import { OnBoardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnBoardingStackParamList>();

function OnBoardingNavigationEntry(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Intro"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={withStatusBar(Intro)} />
            <Stack.Screen name="Login" component={withStatusBar(Login)} />
            <Stack.Screen name="SignUp" component={SignUpNavigationEntry} />
        </Stack.Navigator>
    );
}

export default OnBoardingNavigationEntry;
