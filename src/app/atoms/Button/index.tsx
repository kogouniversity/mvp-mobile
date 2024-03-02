import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { ButtonProps, ButtonSize, ButtonVariant } from './types';

const buttonVariantStyles: Record<ButtonVariant, ViewStyle> = {
    default: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    primary: {
        backgroundColor: 'black',
    },
    secondary: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3,
    },
    tertiary: {
        backgroundColor: 'transparent',
    },
};

const buttonVariantTextStyles: Record<ButtonVariant, TextStyle> = {
    default: {},
    primary: {},
    secondary: {},
    tertiary: {},
};

const buttonSizeStyles: Record<ButtonSize, ViewStyle> = {
    default: {},
    sm: {
        width: 69,
        height: 22,
    },
    md: {
        width: 129,
        height: 33,
    },
    lg: {
        width: 335,
        height: 48,
    },
};

const buttonSizeTextStyles: Record<ButtonSize, TextStyle> = {
    default: {},
    sm: {},
    md: {},
    lg: {},
};

const Button: React.FC<ButtonProps> = function ({
    variant,
    size,
    label,
    style = {},
    disabled = false,
    isLoading = false,
    onPress = () => null,
}) {
    return (
        <TouchableOpacity
            style={[buttonVariantStyles.default, buttonVariantStyles[variant], buttonSizeStyles[size], style]}
            disabled={disabled || isLoading}
            onPress={onPress}
            activeOpacity={0.8}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Text
                    style={[
                        buttonVariantTextStyles.default,
                        buttonVariantTextStyles[variant],
                        buttonSizeTextStyles[size],
                    ]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
