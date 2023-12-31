import { TextStyle, ViewStyle } from 'react-native';

export type ButtonVariant = 'default' | 'primary' | 'secondary';
export type ButtonSize = 'default' | 'sm' | 'md';

export type ButtonProps = {
    variant: ButtonVariant;
    size: ButtonSize;
    style?: ViewStyle;
    overridingTextStyle?: TextStyle;
    onPress?: () => void;
    text: string;
};
