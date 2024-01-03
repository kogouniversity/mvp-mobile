import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { ButtonProps, ButtonSize, ButtonVariant } from './types';

const buttonVariantStyles: Record<ButtonVariant, ViewStyle> = {
    default: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    primary: {
        backgroundColor: 'green',
    },
    secondary: {
        backgroundColor: 'blue',
    },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
    default: {},
    primary: {},
    secondary: {
        color: 'white',
    },
};

const buttonSizeStyles: Record<ButtonSize, ViewStyle> = {
    default: {
        width: '100%',
    },
    sm: {
        width: '100%',
        padding: 8,
    },
    md: {
        width: '100%',
        padding: 16,
    },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
    default: {},
    sm: {
        fontSize: 11,
    },
    md: {
        fontSize: 14,
    },
};

const Button: React.FC<ButtonProps> = function ({
    variant,
    size,
    style = {},
    overridingTextStyle = {},
    onPress = () => null,
    text,
}) {
    return (
        <TouchableOpacity
            style={[
                buttonVariantStyles.default,
                buttonVariantStyles[variant],
                buttonSizeStyles[size],
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}>
            <Text
                style={[
                    textVariantStyles.default,
                    textVariantStyles[variant],
                    textSizeStyles[size],
                    overridingTextStyle,
                ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
