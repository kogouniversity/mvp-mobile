import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export const withStatusBar = (WrappedComponent: React.ComponentType): React.FC =>
    function () {
        return (
            <View>
                <StatusBar />
                <WrappedComponent />
            </View>
        );
    };
