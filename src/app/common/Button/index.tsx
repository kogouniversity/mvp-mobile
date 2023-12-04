import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
    onPress?: () => void;
    text: string;
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'purple',
        borderRadius: 8,
    },
    text: { color: 'white' },
});

export const Button: React.FC<ButtonProps> = function ({ onPress, text }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    onPress: (): null => null,
};
