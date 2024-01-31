import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'default' | 'sm' | 'md' | 'lg';

export type ButtonProps = {
    variant: ButtonVariant;
    size: ButtonSize;
    style?: ViewStyle;
    onPress?: () => void;
    children: ReactNode;
};

