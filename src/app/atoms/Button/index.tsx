import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { ButtonProps, ButtonSize, ButtonVariant } from './types';

const buttonVariantStyles: Record<ButtonVariant, ViewStyle> = {
    default: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    primary: {
        backgroundColor: '#50B1EE',
    },
    secondary: {
        backgroundColor: '#fff',
    },
    tertiary: {
        borderColor: '#9747FF',
        borderWidth: 1,
    },
};

const buttonVariantTextStyles: Record<ButtonVariant, TextStyle> = {
    default: {},
    primary: {
        color: '#fff',
    },
    secondary: {
        color: '#50B1EE',
    },
    tertiary: {
        color: '#5119F0',
    },
};

const buttonVariantDisabledStyles: Record<ButtonVariant, TextStyle> = {
    default: {},
    primary: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    secondary: {
        color: 'rgba(80, 177, 238, 0.3)',
    },
    tertiary: {
        color: 'rgba(81, 25, 240, 0.5)',
    },
};

const buttonSizeStyles: Record<ButtonSize, ViewStyle> = {
    default: {},
    sm: {
        width: 70,
        height: 35,
        borderRadius: 23,
    },
    md: {
        width: 133,
        height: 58,
        borderRadius: 32.5,
    },
    lg: {
        width: 294,
        height: 58,
        borderRadius: 20,
    },
};

const buttonSizeTextStyles: Record<ButtonSize, TextStyle> = {
    default: {},
    sm: {
        fontSize: 13,
    },
    md: {
        fontSize: 14,
    },
    lg: {
        fontSize: 16,
    },
};

const Button: React.FC<ButtonProps> = function ({
    variant,
    size,
    label = 'default',
    style = {},
    disabled = false,
    isLoading = false,
    onPress = () => null,
    testID = undefined,
}) {
    return (
        <TouchableOpacity
            style={[buttonVariantStyles.default, buttonVariantStyles[variant], buttonSizeStyles[size], style]}
            disabled={disabled || isLoading}
            onPress={onPress}
            activeOpacity={0.8}
            testID={testID}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Text
                    style={[
                        buttonVariantTextStyles.default,
                        buttonVariantTextStyles[variant],
                        buttonSizeTextStyles[size],
                        disabled ? buttonVariantDisabledStyles[variant] : [],
                    ]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
