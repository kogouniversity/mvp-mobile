import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
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

const Button: React.FC<ButtonProps> = function ({
    variant,
    size,
    style = {},
    onPress = () => null,
    children,
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
            {children}
        </TouchableOpacity>
    );
};

export default Button;
