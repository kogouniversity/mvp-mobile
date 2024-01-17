import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withStatusBar } from '../hoc';
import Home from './home';
import { MainTabParamList } from './types';
import Feed from './feed';
import MySchedule from './tools';
import Profile from './profile';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainNavigationEntry(): JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={withStatusBar(Home)} />
            <Tab.Screen name="Feed" component={withStatusBar(Feed)} />
            <Tab.Screen
                name="MySchedule"
                component={withStatusBar(MySchedule)}
            />
            <Tab.Screen name="Profile" component={withStatusBar(Profile)} />
        </Tab.Navigator>
    );
}

export default MainNavigationEntry;
