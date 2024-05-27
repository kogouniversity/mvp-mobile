import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withStatusBar } from './hoc';
import Intro from '../screens/Intro';
import Login from '../screens/auth/login/Login';
import SignupEmailInput from '../screens/auth/signup/SignupEmailInput';
import SignupEmailVerification from '../screens/auth/signup/SignupEmailVerification';
import SignupIdAndPassword from '../screens/auth/signup/SignupIdAndPassword';
import MyGroupList from '../screens/group/MyGroupList';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Gadget from '../screens/Gadget';
import { NavigationParamList } from './types';
import CreateNewGroup from '../screens/group/CreateNewGroup';

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
            <Stack.Screen name="/Home/MyGroups" component={withStatusBar(MyGroupList)} />
        </Stack.Navigator>
    );
}

function GroupExploreStackNavigator(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName="/Home/GroupExplore" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/Home/GroupExplore" component={withStatusBar(MyGroupList)} />
            <Stack.Screen name="/Home/GroupExplore/CreateNewGroup" component={withStatusBar(CreateNewGroup)} />
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
