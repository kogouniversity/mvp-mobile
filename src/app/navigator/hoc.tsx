import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const withStatusBar = (WrappedComponent: React.ComponentType): React.FC =>
    function () {
        return (
            <View>
                <StatusBar />
                <WrappedComponent />
            </View>
        );
    };
