import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import MainNavigationEntry from './main';
import OnBoardingNavigationEntry from './onboarding';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigationEntry(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="OnBoarding"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="OnBoarding"
                    component={OnBoardingNavigationEntry}
                />
                <Stack.Screen name="Main" component={MainNavigationEntry} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
