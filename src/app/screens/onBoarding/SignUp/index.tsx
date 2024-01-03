import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withStatusBar } from '../../hoc';
import SchoolEmailVerif from './SchoolEmailVerif';
import SchoolEmailVerifCode from './SchoolEmailVerifCode';
import NewUserSignUp from './NewUserSignUp';
import { SignUpStackParamList } from './types';

const Stack = createNativeStackNavigator<SignUpStackParamList>();

function SignUpNavigationEntry(): JSX.Element {
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

export default SignUpNavigationEntry;
