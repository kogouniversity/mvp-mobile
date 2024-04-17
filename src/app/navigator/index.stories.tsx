import React from 'react';
import { ComponentMeta, StoryObj } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import HomeFeed from '../screens/home/HomeFeed';
import HomeMyGroup from '../screens/home/HomeMyGroup';
import HomeGadget from '../screens/home/HomeGadget';
import HomeExplore from '../screens/home/HomeExplore';
import HomeProfile from '../screens/home/HomeProfile';

const Tab = createBottomTabNavigator();
const MainNavigator = function () {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let Component;

                    if (route.name === 'HomeFeed') {
                        iconName = 'home';
                        Component = Ionicons;
                    } else if (route.name === 'HomeMyGroup') {
                        iconName = 'school';
                        Component = Ionicons;
                    } else if (route.name === 'HomeGadget') {
                        iconName = 'calendar';
                        Component = Entypo;
                    } else if (route.name === 'HomeExplore') {
                        iconName = 'sprout';
                        Component = MaterialCommunityIcons;
                    } else if (route.name === 'HomeProfile') {
                        iconName = 'user-alt';
                        Component = FontAwesome5;
                    }

                    const color = focused ? 'blue' : 'gray';
                    return <Component name={iconName} size={24} color={color} />;
                },
            })}>
            <Tab.Screen name="HomeFeed" component={HomeFeed} />
            <Tab.Screen name="HomeMyGroup" component={HomeMyGroup} />
            <Tab.Screen name="HomeGadget" component={HomeGadget} />
            <Tab.Screen name="HomeExplore" component={HomeExplore} />
            <Tab.Screen name="HomeProfile" component={HomeProfile} />
        </Tab.Navigator>
    );
};

export default {
    title: 'Navigators/MainNavigator',
    component: MainNavigator,
    decorators: [Story => <NavigationContainer>{Story()}</NavigationContainer>],
} as ComponentMeta<typeof MainNavigator>;

const Template: StoryObj<typeof MainNavigator> = {
    render: () => <MainNavigator />,
};

export const Default = Template;
