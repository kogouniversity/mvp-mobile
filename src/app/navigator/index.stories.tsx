import React from 'react';
import { ComponentMeta, StoryObj } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/main/Home'; 
import MySchool from '../screens/main/MySchool';
import NewPost from '../screens/newpost/NewPost';
import Profile from '../screens/main/Profile';
import Explore from '../screens/main/Explore';
import { Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let Component;

                if (route.name === 'Home') {
                    iconName = 'home';
                    Component = Ionicons;
                } else if (route.name === 'MySchool') {
                    iconName = 'school';
                    Component = Ionicons;
                } else if (route.name === 'NewPost') {
                    iconName = 'pluscircleo';
                    Component = AntDesign;
                } else if (route.name === 'Explore') {
                    iconName = 'sprout';
                    Component = MaterialCommunityIcons;
                } else if (route.name === 'Profile') {
                    iconName = 'user-alt';
                    Component = FontAwesome5;
                }

                color = focused ? 'blue' : 'gray';
                return <Component name={iconName} size={24} color={color} />;
            },
        })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MySchool" component={MySchool} />
        <Tab.Screen name="NewPost" component={NewPost} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);

export default {
    title: 'Navigators/MainNavigator',
    component: MainNavigator,
    decorators: [(Story) => <NavigationContainer>{Story()}</NavigationContainer>],
} as ComponentMeta<typeof MainNavigator>;

const Template: StoryObj<typeof MainNavigator> = {
    render: () => <MainNavigator />,
};

export const Default = Template;
