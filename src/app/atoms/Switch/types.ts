import { ViewStyle } from 'react-native';

export type SwitchProps = {
    value: boolean;
    onSwitch: () => void;
    style?: ViewStyle;
};
