import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    OnBoarding: object;
    Login: object;
    Main: object;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
