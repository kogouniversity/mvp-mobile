import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';

// Preload Assets
import './utils/assets';

import { withStatusBar } from './screens';
import Intro from './screens/Intro';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Intro"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={withStatusBar(Intro)} />
                <Stack.Screen name="Login" component={withStatusBar(Login)} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

let AppEntryPoint = App;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires, global-require */
    AppEntryPoint = require('../../.storybook').default;
}

registerRootComponent(AppEntryPoint);
