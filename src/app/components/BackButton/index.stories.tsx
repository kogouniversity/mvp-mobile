import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import BackButton from './index';

type MockNavigationType = {
    goBack: () => void;
    navigate: (screenName: string) => void;
};

const ScreenOne = ({ navigation }: { navigation: MockNavigationType }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen One</Text>
        <Button title="Go to Screen Two" onPress={() => navigation.navigate('ScreenTwo')} />
    </View>
);

const ScreenTwo = ({ navigation }: { navigation: MockNavigationType }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen Two</Text>
        <Button title="Go to Screen Three" onPress={() => navigation.navigate('ScreenThree')} />
        <BackButton navigation={navigation as NavigationProp<ParamListBase>} />
    </View>
);

const ScreenThree = ({ navigation }: { navigation: MockNavigationType }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen Three</Text>
        <BackButton navigation={navigation as NavigationProp<ParamListBase>} />
    </View>
);

const MockNavigationContainer = () => {
    const [history, setHistory] = useState<string[]>(['ScreenOne']);

    const navigate = (screenName: string) => {
        setHistory(prevHistory => [...prevHistory, screenName]);
    };

    const goBack = () => {
        setHistory(prevHistory => prevHistory.slice(0, -1));
    };

    const mockNavigation = {
        goBack,
        navigate,
    };

    const currentScreen = history[history.length - 1];
    let ScreenComponent = ScreenOne;

    switch (currentScreen) {
        case 'ScreenOne':
            ScreenComponent = ScreenOne;
            break;
        case 'ScreenTwo':
            ScreenComponent = ScreenTwo;
            break;
        case 'ScreenThree':
            ScreenComponent = ScreenThree;
            break;
    }

    return <ScreenComponent navigation={mockNavigation as NavigationProp<ParamListBase>} />;
};

const meta: ComponentMeta<typeof BackButton> = {
    title: 'Components/BackButton',
    component: BackButton,
};

export default meta;

const Template: StoryFn<typeof MockNavigationContainer> = () => <MockNavigationContainer />;

export const Default: StoryObj<typeof MockNavigationContainer> = {
    render: Template,
};
