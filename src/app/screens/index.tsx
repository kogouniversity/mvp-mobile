import { useNavigation as useNavigationImpl } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { RootStackParamList } from './types';

export const withStatusBar = (
    WrappedComponent: React.ComponentType,
): React.FC =>
    function () {
        return (
            <View>
                <StatusBar />
                <WrappedComponent />
            </View>
        );
    };

export const useNavigation = useNavigationImpl<
    NativeStackNavigationProp<RootStackParamList>
>;
