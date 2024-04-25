import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withStatusBar } from './hoc';
import Intro from '../screens/Intro';
import AuthLogin from '../screens/auth/AuthLogin';
import AuthSignupEmailInput from '../screens/auth/signup/AuthSignupEmailInput';
import AuthSignupEmailVerification from '../screens/auth/signup/AuthSignupEmailVerification';
import AuthSignupIdAndPassword from '../screens/auth/signup/AuthSignupIdAndPassword';
import GroupMyGroups from '../screens/group/GroupMyGroups';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Gadget from '../screens/Gadget';
import { NavigationParamList } from './types';
import GroupNewGroup from '../screens/group/GroupNewGroup';

const Tab = createBottomTabNavigator<NavigationParamList>();
const Stack = createNativeStackNavigator<NavigationParamList>();

export default function RootNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/" component={withStatusBar(Intro)} />
            <Stack.Screen name="/Login" component={withStatusBar(AuthLogin)} />
            <Stack.Screen name="/Signup" component={withStatusBar(AuthSignupIdAndPassword)} />
            <Stack.Screen name="/Signup/EmailInput" component={withStatusBar(AuthSignupEmailInput)} />
            <Stack.Screen name="/Signup/EmailVerification" component={withStatusBar(AuthSignupEmailVerification)} />
            <Stack.Screen name="/Home" component={HomeTabNavigator} />
        </Stack.Navigator>
    );
}

function HomeTabNavigator(): JSX.Element {
    return (
        <Tab.Navigator initialRouteName="/Home/Gadget" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="/Home/Feed" component={withStatusBar(FeedStackNavigator)} />
            <Tab.Screen name="/Home/MyGroups" component={withStatusBar(MyGroupStackNavigator)} />
            <Tab.Screen name="/Home/Gadget" component={withStatusBar(GadgetStackNavigator)} />
            <Tab.Screen name="/Home/GroupExplore" component={withStatusBar(GroupExploreStackNavigator)} />
            <Tab.Screen name="/Home/Profile" component={withStatusBar(ProfileStackNavigator)} />
        </Tab.Navigator>
    );
}

function MyGroupStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/Home/MyGroups" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/Home/MyGroups" component={withStatusBar(GroupMyGroups)} />
        </Stack.Navigator>
    );
}

function GroupExploreStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/Home/GroupExplore" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/Home/GroupExplore" component={withStatusBar(GroupMyGroups)} />
            <Stack.Screen name="/Home/GroupExplore/NewGroup" component={withStatusBar(GroupNewGroup)} />
        </Stack.Navigator>
    );
}

function FeedStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/Home/Feed" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/Home/Feed" component={withStatusBar(Feed)} />
        </Stack.Navigator>
    );
}

function GadgetStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/Home/Gadget" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/Home/Gadget" component={withStatusBar(Gadget)} />
        </Stack.Navigator>
    );
}

function ProfileStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/Home/Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/Home/Profile" component={withStatusBar(Profile)} />
        </Stack.Navigator>
    );
}
