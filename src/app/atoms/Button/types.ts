import { ViewStyle } from 'react-native';

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

export type ButtonSize = 'default' | 'sm' | 'md' | 'lg';

export type ButtonProps = {
    variant: ButtonVariant;
    size: ButtonSize;
    label: string;
    style?: ViewStyle;
    disabled?: boolean;
    isLoading?: boolean;
    testID?: string;
    onPress?: () => void;
};
