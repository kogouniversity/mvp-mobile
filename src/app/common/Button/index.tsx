import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

type ButtonVariant = 'default' | 'primary' | 'secondary';
type ButtonSize = 'default' | 'small' | 'medium';

type ButtonProps = {
    variant: ButtonVariant;
    size: ButtonSize;
    buttonStyles?: ViewStyle;
    textStyles?: TextStyle;
    onPress?: () => void;
    text: string;
};

const buttonVariantStyles: Record<ButtonVariant, ViewStyle> = {
    default: {},
    primary: {
        padding: 8,
        backgroundColor: 'green',
    },
    secondary: {
        padding: 8,
        backgroundColor: 'blue',
    },
};

const buttonSizeStyles: Record<ButtonSize, ViewStyle> = {
    default: {},
    small: {
        minWidth: 150,
        minHeight: 150,
    },
    medium: {
        minWidth: 300,
        minHeight: 300,
    },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
    default: {},
    primary: {},
    secondary: {
        color: 'white',
    },
};

export const Button: React.FC<ButtonProps> = function ({
    variant,
    size,
    buttonStyles,
    textStyles,
    onPress,
    text,
}) {
    return (
        <TouchableOpacity
            style={[
                buttonVariantStyles[variant],
                buttonSizeStyles[size],
                buttonStyles,
            ]}
            onPress={onPress}
            activeOpacity={0.8}>
            <Text style={[textVariantStyles[variant], textStyles]}>{text}</Text>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    buttonStyles: {},
    textStyles: {},
    onPress: (): null => null,
};
